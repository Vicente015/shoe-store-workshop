<?php

namespace Tests\Feature;

use Acme\PaymentGateway\PaymentApiClient;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use Tests\Builders\UserBuilder;
use Tests\TestCase;

class CheckoutControllerTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();

        $this->userBuilder = new UserBuilder();

        app()->bind(PaymentApiClient::class, function () {
            $paymentApiMock = $this->mock(PaymentApiClient::class);
            $paymentApiMock
                ->shouldReceive('setAmount')
                ->andReturnSelf();
            $paymentApiMock
                ->shouldReceive('charge')
                ->andReturn(true);

            return $paymentApiMock;
        });
    }

    #[Test]
    public function test_checkout_as_anonymous_user(): void
    {
        $product_to_purchase = Product::factory()->create();

        $response = $this->postJson('/api/checkout', [
            'price' => $product_to_purchase->price,
            'products' => [$product_to_purchase->slug],
            'email' => 'example@example.com',
        ]);

        $response->assertStatus(200);
    }

    #[Test]
    public function test_checkout_creates_an_order(): void
    {
        $product_to_purchase = Product::factory()->create(['price' => 50]);

        $this->postJson('/api/checkout', [
            'price' => 50,
            'products' => [$product_to_purchase->slug],
            'email' => 'example@example.com',
        ]);

        $this->assertEquals(1, Order::query()->count());
        $order = Order::query()->first();
        $this->assertEquals($order->user, null);
        $this->assertEquals($order->price, 50);
        $this->assertCount(1, $order->products);
        $this->assertTrue($order->products[0]->is($product_to_purchase));
    }

    #[Test]
    public function test_checkout_sends_an_email(): void
    {
        Mail::fake();
        $product_to_purchase = Product::factory()->create();

        $this->postJson('/api/checkout', [
            'price' => $product_to_purchase->price,
            'products' => [$product_to_purchase->slug],
            'email' => 'example@example.com',
        ]);

        Mail::assertSentCount(1);
    }

    #[Test]
    public function test_checkout_charges_money_from_customer(): void
    {
        Mail::fake();
        $product_to_purchase = Product::factory()->create(['price' => 50]);
        app()->bind(PaymentApiClient::class, function () {
            $paymentApiMock = $this->mock(PaymentApiClient::class);
            $paymentApiMock
                ->shouldReceive('setAmount')
                ->with(50.0)
                ->andReturnSelf()
                ->once();
            $paymentApiMock
                ->shouldReceive('charge')
                ->andReturn(true)
                ->once();

            return $paymentApiMock;
        });

        $this->postJson('/api/checkout', [
            'price' => $product_to_purchase->price,
            'products' => [$product_to_purchase->slug],
            'email' => 'example@example.com',
        ]);
    }

    #[Test]
    public function registered_user_gets_2_percent_discount_when_purchasing_1_product(): void
    {
        Product::create([
            'name' => 'Nike Zoom',
            'price' => 100,
            'image' => 'https://picsum.photos/201/300',
        ]);
        $user = $this->userBuilder->create();
        $token = $user->createToken('Personal Access Token')->plainTextToken;

        $response = $this
            ->withHeader('Authorization', 'Bearer '.$token)
            ->postJson('/api/checkout', [
            'price' => 98,
            'products' => ['nike-zoom'],
            'email' => 'example@example.com',
        ]);

        $response->assertStatus(200);
    }

    public static function discounts_for_registered_users(): array
    {
        return [
            ['numberOfProducts' => 1, 'discount' => 2],
            ['numberOfProducts' => 2, 'discount' => 5],
        ];
    }

    #[Test]
    #[DataProvider(methodName: "discounts_for_registered_users")]
    public function registered_user_gets_X_percent_discount_when_purchasing_N_product(int $numberOfProducts, float $discount): void
    {
        $products = Product::factory()->count($numberOfProducts)->create(['price' => 50]);
        $user = $this->userBuilder->create();
        $token = $user->createToken('Personal Access Token')->plainTextToken;

        $response = $this
            ->withHeader('Authorization', 'Bearer '.$token)
            ->postJson('/api/checkout', [
            'price' => $numberOfProducts * 50 * (100-$discount) / 100,
            'products' => $products->map(fn ($p) => $p->slug),
            'email' => 'example@example.com',
        ]);

        $response->assertStatus(200);
    }
}

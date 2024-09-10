<?php

namespace Tests\Feature;

use Acme\PaymentGateway\PaymentApiClient;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class CheckoutControllerTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();
        $this->paymentApiMock = $this->mock(PaymentApiClient::class);
        $this->paymentApiMock->shouldReceive('setAmount')->andReturn($this->paymentApiMock);
        $this->paymentApiMock->shouldReceive('charge')->andReturn(true);
        app()->bind(PaymentApiClient::class, fn () => $this->paymentApiMock);
    }

    #[Test]
    public function test_checkout_as_anonymous_user(): void
    {
        $product_to_purchase = $this->createExampleProduct();

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
        $product_to_purchase = $this->createExampleProduct();

        $this->postJson('/api/checkout', [
            'price' => $product_to_purchase->price,
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
        $product_to_purchase = $this->createExampleProduct();

        $this->postJson('/api/checkout', [
            'price' => $product_to_purchase->price,
            'products' => [$product_to_purchase->slug],
            'email' => 'example@example.com',
        ]);

        Mail::assertSentCount(1);
    }

    public function createExampleProduct(): Product
    {
        $product = Product::create([
            'name' => 'Nike Zoom',
            'price' => 50,
            'image' => 'https://picsum.photos/201/300',
        ]);
        $product->save();
        return $product;
    }
}

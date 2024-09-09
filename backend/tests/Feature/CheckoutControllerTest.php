<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class CheckoutControllerTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function checkout_cart_success(): void
    {
        Product::factory()
            ->count(2)
            ->sequence(
                ['slug' => 'product-1', 'price' => 20.0],
                ['slug' => 'product-2', 'price' => 10.0],
            )
            ->create();

        $response = $this->postJson('/api/checkout', [
            'price' => 30.00,
            'products' => ['product-1', 'product-2'],
        ]);

        $response->assertStatus(200);
        $response->assertExactJson(['status' => 'success']);
    }

    #[Test]
    public function check_order_created_for_anonymous_user(): void
    {
        $product_to_purchase = Product::factory()->create(
            ['slug' => 'product-1', 'price' => 10.0],
        );

        $this->postJson('/api/checkout', [
            'price' => 10.00,
            'products' => ['product-1'],
        ]);

        $this->assertEquals(1, Order::query()->count());
        $order = Order::all()->first();
        $this->assertNull($order->user);
        $this->assertEquals(10.0, $order->price);
        $this->assertEquals(1, $order->products->count());
        $this->assertTrue($order->products->first()->is($product_to_purchase));
    }

    #[Test]
    public function checkout_cart_with_wrong_price(): void
    {
        Product::factory()->create(['slug' => 'product-1', 'price' => 20.0]);

        $response = $this->postJson('/api/checkout', [
            'price' => 5.00,
            'products' => ['product-1'],
        ]);

        $response->assertStatus(400);
        $response->assertExactJson(['error' => 'invalid price']);
    }

    #[Test]
    public function guest_users_get_0_percent_discount_for_any_products(): void
    {
        Product::factory()->create(['slug' => 'product-1', 'price' => 100.0]);

        $response = $this->postJson('/api/checkout', [
            'price' => 100.00,
            'products' => ['product-1'],
        ]);

        $response->assertStatus(200);
    }

    #[Test]
    public function registered_users_get_2_percent_discount_for_1_product(): void
    {
        $user = User::factory()->create(['password' => 'userPassword']);
        $token = $user->createToken('YourAppToken')->plainTextToken;
        Product::factory()->create(['slug' => 'product-1', 'price' => 100.0]);

        $response = $this
            ->withHeaders([
                'Authorization' => 'Bearer ' . $token,
            ])
            ->postJson('/api/checkout', [
            'price' => 98.00,
            'products' => ['product-1'],
        ]);

        $response->assertStatus(200);
    }
}

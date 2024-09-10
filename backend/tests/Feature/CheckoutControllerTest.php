<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class CheckoutControllerTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function test_checkout_as_anonymous_user(): void
    {
        Product::create([
            'name' => 'Nike Zoom',
            'price' => 50,
            'image' => 'https://picsum.photos/201/300',
        ])->save();

        $response = $this->postJson('/api/checkout', [
            'price' => 50.0,
            'products' => ['nike-zoom'],
            'email' => 'example@example.com',
        ]);

        $response->assertStatus(200);
    }

    #[Test]
    public function test_checkout_creates_an_order(): void
    {
        $prodcut_to_purchase = Product::create([
            'name' => 'Nike Zoom',
            'price' => 50,
            'image' => 'https://picsum.photos/201/300',
        ]);
        $prodcut_to_purchase->save();

        $this->postJson('/api/checkout', [
            'price' => 50.0,
            'products' => ['nike-zoom'],
            'email' => 'example@example.com',
        ]);

        $this->assertEquals(1, Order::query()->count());
        $order = Order::query()->first();
        $this->assertEquals($order->user, null);
        $this->assertEquals($order->price, 50);
        $this->assertCount(1, $order->products);
        $this->assertTrue($order->products[0]->is($prodcut_to_purchase));
    }
}

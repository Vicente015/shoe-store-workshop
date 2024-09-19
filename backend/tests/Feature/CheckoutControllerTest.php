<?php

namespace Tests\Feature;

use Acme\PaymentGateway\PaymentApiClient;
use App\Mail\OrderCreated;
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
        $this->spy(PaymentApiClient::class);
    }

    #[Test]
    public function checkout_success(): void
    {
        Mail::fake();
        $product = Product::create(['name' => 'example', 'price' => 100]);

        $response = $this->postJson('/api/checkout', [
            'email' => 'example@example.com',
            'products' => ['example'],
            'price' => 100,
        ]);

        $this->assertEquals(200, $response->status(), $response->getContent());
        $this->assertEquals(1, Order::count());
        $order = Order::all()->first();
        $this->assertNull($order->user);
        $this->assertEquals(100, $order->price);
        $this->assertCount(1, $order->products);
        $this->assertTrue($order->products[0]->is($product));
        Mail::assertSentCount(1);
        Mail::assertSent(OrderCreated::class, 'example@example.com');
    }

    #[Test]
    public function cannot_cheat_price(): void
    {
        Product::create(['name' => 'example', 'price' => 100]);

        $response = $this->postJson('/api/checkout', [
            'email' => 'example@example.com',
            'products' => ['example'],
            'price' => 10,
        ]);

        $this->assertEquals(400, $response->status(), $response->getContent());
        $this->assertEquals(0, Order::count());
    }

    #[Test]
    public function payment_gateway_performs_charge(): void
    {
        Product::create(['name' => 'example', 'price' => 100]);
        $spy = $this->spy(PaymentApiClient::class);

        $this->postJson('/api/checkout', [
            'email' => 'example@example.com',
            'products' => ['example'],
            'price' => 100,
        ]);


        $spy
            ->shouldHaveReceived('setAmount', [100])
            ->once();
        $spy->shouldHaveReceived('charge');
    }
}

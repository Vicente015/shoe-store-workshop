<?php

namespace Tests\Feature;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class CheckoutTest extends TestCase
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
}

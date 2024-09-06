<?php

namespace Tests\Feature;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ProductListTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function show_attributes_of_existing_products(): void
    {
        Product::factory()->create([
            'name' => 'Nike Zoom',
            'price' => 99.99,
            'uuid' => "9cf18d94-143f-4906-945b-0567602112fa",
            'image' => "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=640&auto=format&fit=crop"
        ]);

        $response = $this->get('/api');

        $response->assertStatus(200);
        $response->assertExactJson([
            [
                'name' => 'Nike Zoom',
                "slug" => "nike-zoom",
                'price' => "99.99",
                'uuid' => "9cf18d94-143f-4906-945b-0567602112fa",
                'image' => "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=640&auto=format&fit=crop"
            ],
        ]);
    }
}

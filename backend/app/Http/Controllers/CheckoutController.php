<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CheckoutController extends Controller
{
    public function execute(Request $request): JsonResponse
    {
        $products = $this->getProductsFromCart($request);
        $price = $request->input('price', 0);

        if (!$this->validatePrice($price, $products)) {
            return new JsonResponse([
                'error' => 'invalid price',
            ], 400);
        }

        return new JsonResponse(['status' => 'success']);
    }

    public function getProductsFromCart(Request $request): array
    {
        $products = [];
        foreach ($request->json('products', []) as $slug) {
            $products[] = Product::where('slug', $slug)->firstOrFail();
        }
        return $products;
    }

    private function validatePrice(float $price, array $products): bool
    {
        $expected_price = array_sum(array_map(fn ($p) => $p->price, $products));

        return $expected_price === $price;
    }
}

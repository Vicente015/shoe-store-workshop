<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

        $order = Order::create(['price' => $price]);
        $order->user()->associate($this->getUser())->save();
        $order->products()->saveMany($products);

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

    private function getUser() {
        return Auth::guard('sanctum')->user();
    }

    private function validatePrice(float $submitted_price, array $products): bool
    {
        $price_sum_of_all_products = array_sum(array_map(fn ($p) => (float) $p->price, $products));
        return $price_sum_of_all_products === $submitted_price;
    }
}

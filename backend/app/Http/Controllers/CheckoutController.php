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
        $price_sum_of_all_products = array_sum(array_map(fn ($p) => $p->price, $products));
        $discounted_price = $this->applyDiscount($price_sum_of_all_products, count($products));

        return $discounted_price === $submitted_price;
    }

    private function applyDiscount(float|int $expected_price, int $amount_of_products)
    {
        $user = $this->getUser();
        if (!$user) {
            return $expected_price;
        }

        return $this->applyDiscountForRegisteredUser($expected_price, $amount_of_products);
    }

    private function applyDiscountForRegisteredUser(float $starting_price, int $amount_of_products): float
    {
        switch ($amount_of_products) {
            case 1:
                $discount = 0.98;
                break;
            default:
                $discount = 1;
        }

        return $starting_price * $discount;
    }
}

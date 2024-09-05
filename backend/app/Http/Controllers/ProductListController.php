<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\JsonResponse;

class ProductListController extends Controller
{
    public function index(): JsonResponse
    {
        return new JsonResponse(Product::all());
    }
}

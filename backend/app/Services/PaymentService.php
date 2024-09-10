<?php

namespace App\Services;

use App\Models\Order;

class PaymentService
{
    public function __construct() {

    }

    public function payOrder(Order $order): void {
        (new PaymentApiClient(config('payment.api_key')))
            ->setAmount($order->price)
            ->charge();
    }
}

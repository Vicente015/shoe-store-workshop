<?php

namespace App\Services;

use Acme\PaymentGateway\PaymentApiClient;
use App\Models\Order;

class PaymentService
{
    private PaymentApiClient $api;

    public function __construct(PaymentApiClient $api) {
        $this->api = $api;
    }

    public function payOrder(Order $order): void {
        $this->api
            ->setAmount($order->price)
            ->charge();
    }
}

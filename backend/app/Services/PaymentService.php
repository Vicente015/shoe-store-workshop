<?php

namespace App\Services;

use Acme\PaymentGateway\PaymentApiClient;
use App\Models\Order;

class PaymentService
{
    public function payOrder(Order $order): void
    {
        (new PaymentApiClient(config('payment.api_key')))
            ->setAmount($order->price)
            ->charge();
    }
}

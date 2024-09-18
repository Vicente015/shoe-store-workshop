<?php

namespace Acme\PaymentGateway;

class PaymentApiClient
{
    private string $api_key;
    private float $amount;

    public function __construct() {
        $this->api_key = config('payment.api_key');
    }

    public function setAmount(float $amount): self {
        $this->amount = $amount;
        return $this;
    }

    /**
     * Simulate a slow API with a 1 in 10 chance of failure.
     * You will want to keep your tests away from this.
     */
    public function charge(): bool {
        sleep(2);

        if (rand(1,20) == 1) {
            throw new \Exception("Payment error, unable to charge");
        }

        return true;
    }
}

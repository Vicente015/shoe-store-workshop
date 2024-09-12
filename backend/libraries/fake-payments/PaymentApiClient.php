<?php

namespace Acme\PaymentGateway;

class PaymentApiClient
{
    private string $api_key;
    private float $amount;

    public function __construct(string $api_key) {
        $this->api_key = $api_key;
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

        if (rand(1,10) == 1) {
            throw new \Exception("Payment error, unable to charge");
        }

        $this->logOperationSuccess($this->amount);

        return true;
    }

    /**
     * Save the operation into a log, if this was a real API we would look
     * into the sandbox/test environment and see the transactions there.
     */
    private function logOperationSuccess(float $amount)
    {
        file_put_contents(
            storage_path('logs/payment-api.log'),
            date("Y-m-d H:i:s") . " charged amount {$amount}\n",
            FILE_APPEND);
    }
}

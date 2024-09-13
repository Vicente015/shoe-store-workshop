<?php

namespace Tests\Feature;


use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic test example.
     */
    public function test_assert_response_success_on_root(): void
    {
        $this->get('/')->assertStatus(200);
    }
}

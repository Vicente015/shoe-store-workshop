<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\Support\Facades\Http;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    #[Test]
    public function user_get_access_token_on_login(): void
    {
        $user = User::factory()->create(['password' => 'userPassword']);

        $response = $this->postJson('/api/auth/login', [
            'email' => $user->email,
            'password' => 'userPassword',
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure(['token']);
    }

    #[Test]
    public function use_access_token_to_identify_user(): void
    {
        $user = User::factory()->create(['password' => 'userPassword']);
        $token = $user->createToken('YourAppToken')->plainTextToken;

        $response = $this->getJson('/api/auth/me', [
            'Authorization' => 'Bearer ' . $token,
        ]);

        $this->assertEquals(200, $response->getStatusCode());
    }

    #[Test]
    public function cannot_identify_user_without_an_access_token(): void
    {
        $response = $this->getJson('/api/auth/me');

        $response->assertStatus(401);
    }
}

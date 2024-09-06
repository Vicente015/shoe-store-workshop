<?php

namespace Tests\Feature;

use App\Models\User;
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
        $token = $this->postJson('/api/auth/login', [
            'email' => $user->email,
            'password' => 'userPassword',
        ])->json('token');

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->get('/api/auth/me');

        $response->assertStatus(200);
        $response->assertExactJson([
            'name' => $user->name,
            'email' => $user->email,
        ]);
    }

    #[Test]
    public function cannot_identify_user_without_an_access_token(): void
    {
        $response = $this->get('/api/auth/me');

        $response->assertStatus(401);
    }
}

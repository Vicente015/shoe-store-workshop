<?php

namespace Tests\Builders;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserBuilder
{
    private string $email;
    private string $name;
    private string $password;

    public function __construct() {
        $this->reset();
    }

    private function reset(): void {
        $this->email = "example@domain.com";
        $this->name = "John Doe";
        $this->password = "password";
    }

    public function withEmail(string $email): self
    {
        $this->email = $email;
        return $this;
    }

    public function withName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    public function withPassword(string $password): self
    {
        $this->password = $password;
        return $this;
    }

    public function create(): User {
        $user = new User([
            'name' => $this->name,
            'email' => $this->email,
            'email_verified_at' => now(),
            'password' => Hash::make($this->password),
            'remember_token' => Str::random(10),
        ]);
        $user->save();
        $this->reset();

        return $user;
    }
}

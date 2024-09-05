<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory;
    use HasUuids;

    protected $table = 'products';
    protected $primaryKey = 'uuid';
    public $timestamps = false;

    protected $attributes = [
        'name' => '',
        'slug' => '',
        'price' => 0,
        'image' => '',
    ];

    protected function name(): Attribute
    {
        return Attribute::make(
            set: fn ($value) => [
                'name' => $value,
                'slug' => Str::slug($value),
            ],
        );
    }
}

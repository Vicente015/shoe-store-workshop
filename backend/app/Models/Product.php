<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory;
    use HasUuids;

    protected $table = 'products';
    protected $primaryKey = 'uuid';
    public $timestamps = false;

    protected $fillable = ['name', 'price', 'image'];
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

    protected function price(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => (float) $value,
        );
    }

    public function order(): BelongsToMany
    {
        return $this->belongsToMany(Order::class, 'order_products');
    }
}

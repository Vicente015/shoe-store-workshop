<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Membership extends Model
{
    use HasFactory;
    use HasUuids;

    public $table = 'membership';
    protected $primaryKey = 'uuid';
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'type',
    ];

    protected $attributes = [
        'type' => 'standard',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

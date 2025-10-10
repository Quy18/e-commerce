<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    use HasFactory;
    protected $fillable = [
        'code',
        'type',
        'value',
        'min_order_value',
        'usage_limit',
        'used_count',
        'start_date',
        'end_date',
        'is_active',
    ];
    public function isValid(): bool
    {
        $now = now();
        if (!$this->is_active) return false;
        if ($this->start_date && $now->lt($this->start_date)) return false;
        if ($this->end_date && $now->gt($this->end_date)) return false;
        if ($this->usage_limit && $this->used_count >= $this->usage_limit) return false;

        return true;
    }
}

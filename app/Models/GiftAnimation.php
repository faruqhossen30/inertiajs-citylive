<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GiftAnimation extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'photoURL','size','dimond'];

}

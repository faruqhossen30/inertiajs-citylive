<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EntryFrame extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'photoURL','size','dimond'];
}


<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Marcaje extends Model
{
    use HasFactory;

    protected $table = 'marcajes';
    protected $primaryKey = 'id';
    protected $fillable = ['user_id'];
}

<?php

namespace App\Models\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\User;

class SocialProfile extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'social_id', 'social_name', 'social_avatar'];

    //Relacion uno a muchos inversa con users
    public function user(){
        return $this->belongsTo(User::class);
    }
}

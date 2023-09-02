<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request) {
        $fields = $request->validate([
            'nome' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'senha' => 'required|string|confirmed',
            'cargo' => 'required|integer'
        ]);

        $usuario = User::create([
            'nome' => $fields['nome'],
            'email' => $fields['email'],
            'senha' => bcrypt($fields['senha']),
            'cargo' => $fields['cargo']
        ]);

        $token = $usuario->createToken($request->nameToken)->plainTextToken;

        $response = [
            'usuario' => $usuario,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function login(Request $request) {
        
        $fields = $request->validate([
            'email' => 'required|string',
            'senha' => 'required|string'
        ]);

        $usuario = User::where('email', $fields['email'])->first();
        if (!$usuario || !Hash::check($fields['senha'], $usuario->password)) {
            return response([
                'message' => 'E-mail ou senha invalidos.'
            ], 401);
        }

        $token = $usuario->createToken('UsuarioLogado')->plainTextToken;

        $response = [
            'user' => $usuario,
            'token' => $token
        ];

        return response($response, 200);
    }

    public function logout(Request $request) {
        auth()->user()->tokens()->delete();

        return response([
            'message' => 'Usuario deslogado com sucesso.'
        ], 200);
    }

}

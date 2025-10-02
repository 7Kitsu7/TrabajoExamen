<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // 1. VALIDAR datos del frontend
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:usuarios',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // 2. CREAR usuario en la base de datos
        $usuario = Usuario::create([
            'nombre' => $request->nombre,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // 3. GENERAR token de autenticación
        $token = $usuario->createToken('auth_token')->plainTextToken;

        // 4. RESPONDER al frontend
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'usuario' => $usuario
        ]);
    }

    public function login(Request $request)
    {
        // 1. VALIDAR credenciales
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // 2. BUSCAR usuario por email
        $usuario = Usuario::where('email', $request->email)->first();

        // 3. VERIFICAR contraseña
        if (!$usuario || !Hash::check($request->password, $usuario->password)) {
            return response()->json(['message' => 'Credenciales inválidas'], 401);
        }

        // 4. GENERAR token
        $token = $usuario->createToken('auth_token')->plainTextToken;

        // 5. RESPONDER
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'usuario' => $usuario
        ]);
    }

    public function logout(Request $request)
    {
        // ELIMINAR token actual
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Sesión cerrada correctamente']);
    }

    public function user(Request $request)
    {
        // DEVOLVER usuario actual
        return response()->json($request->user());
    }
}
<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;

class ClienteController extends Controller
{
    // GET /api/clientes - LISTAR todos los clientes
    public function index()
    {
        $clientes = Cliente::all();
        return response()->json($clientes);
    }

    // POST /api/clientes - CREAR nuevo cliente
    public function store(Request $request)
    {
        // 1. VALIDAR datos
        $request->validate([
            'nombre' => 'required|string|max:255',
            'email' => 'nullable|email',
            'telefono' => 'nullable|string|max:20',
            'direccion' => 'nullable|string',
        ]);

        // 2. CREAR cliente
        $cliente = Cliente::create($request->all());

        // 3. RESPONDER
        return response()->json($cliente, 201);
    }

    // GET /api/clientes/{id} - OBTENER un cliente específico
    public function show($id)
    {
        $cliente = Cliente::findOrFail($id);
        return response()->json($cliente);
    }

    // PUT /api/clientes/{id} - ACTUALIZAR cliente
    public function update(Request $request, $id)
    {
        // 1. BUSCAR cliente
        $cliente = Cliente::findOrFail($id);

        // 2. VALIDAR datos
        $request->validate([
            'nombre' => 'required|string|max:255',
            'email' => 'nullable|email',
            'telefono' => 'nullable|string|max:20',
            'direccion' => 'nullable|string',
        ]);

        // 3. ACTUALIZAR cliente
        $cliente->update($request->all());

        // 4. RESPONDER
        return response()->json($cliente);
    }

    // DELETE /api/clientes/{id} - ELIMINAR cliente
    public function destroy($id)
    {
        $cliente = Cliente::findOrFail($id);
        $cliente->delete();

        return response()->json(['message' => 'Cliente eliminado correctamente']);
    }
}
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Config;
use App\Mail\Invoice;
use Throwable;

class InvoiceController extends Controller
{
    public function send(Request $request)
    {
        $request->validate([
            'subject' => 'required|string|max:100',
            'name' => 'required|string|max:255',
            'worktime_from' => 'required|string',
            'worktime_to' => 'required|string',
            'email_to' => 'required|email|max:255',
            'reply_to' => 'required|email|max:255',
            'smtp' => 'required|string',
            'port' => 'required|integer',
            'username' => 'required|string',
            'password' => 'required|string',
            'encryption' => 'required|string',
            'attachment' => 'required|file|mimes:pdf|max:5120', // max 5MB
        ]);

        Config::set('mail.mailers.smtp', [
            'transport' => 'smtp',
            'host' => $request['smtp'],
            'port' => $request['port'],
            'username' => $request['username'],
            'password' => $request['password'],
            'encryption' => $request['encryption'],
            'timeout' => null,
            'auth_mode' => null,
        ]);

        $file = $request->file('attachment');
        $fileContent = file_get_contents($file->getRealPath());
        $fileName = $file->getClientOriginalName();
        $mimeType = $file->getMimeType();
    
        try {
            Mail::to($request->email_to)->send(
                new Invoice($request->all(), $fileContent, $fileName, $mimeType)
            );

            return response()->json(['message' => 'Invoice submitted successfully.'], 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Failed to send the email.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\Invoice;

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
            'attachment' => 'required|file|mimes:pdf|max:5120', // max 5MB
        ]);
    
        $file = $request->file('attachment');
        $fileContent = file_get_contents($file->getRealPath());
        $fileName = $file->getClientOriginalName();
        $mimeType = $file->getMimeType();
    
        Mail::to($request->email_to)->send(
            new Invoice($request->all(), $fileContent, $fileName, $mimeType)
        );
    
        return response()->json(['message' => 'Invoice submitted successfully.'], 200);
    }
}

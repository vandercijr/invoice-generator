<?php

namespace App\Http\Controllers;

use App\Jobs\SendInvoiceEmail;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function send(Request $request)
    {
        $request->validate([
            'subject' => 'required|string|max:100',
            'name' => 'required|string|max:255',
            'worktime_from' => 'required|string',
            'worktime_to' => 'required|string',
            'email_to' => ['required', 'string', 'max:1000', function ($attribute, $value, $fail) {
                $emails = array_filter(array_map('trim', explode(',', $value)));

                if (empty($emails)) {
                    $fail('At least one recipient email is required.');
                    return;
                }

                foreach ($emails as $email) {
                    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                        $fail("The email address \"{$email}\" is invalid.");
                    }
                }
            }],
            'reply_to' => 'required|email|max:255',
            'smtp' => 'required|string',
            'port' => 'required|integer',
            'username' => 'required|string',
            'password' => 'required|string',
            'encryption' => 'required|string',
            'attachment' => 'required|file|mimes:pdf|max:5120', // max 5MB
        ]);

        $emailTo = array_filter(array_map('trim', explode(',', $request->email_to)));

        $mailerConfig = [
            'transport' => 'smtp',
            'host' => $request['smtp'],
            'port' => $request['port'],
            'username' => $request['username'],
            'password' => $request['password'],
            'encryption' => $request['encryption'],
            'timeout' => null,
            'auth_mode' => null,
        ];

        $data = [
            'subject' => $request['subject'],
            'name' => $request['name'],
            'worktime_from' => $request['worktime_from'],
            'worktime_to' => $request['worktime_to'],
            'username' => $request['username'],
            'reply_to' => $request['reply_to'],
        ];

        $file = $request->file('attachment');
        $fileContent = base64_encode(file_get_contents($file->getRealPath()));
        $fileName = $file->getClientOriginalName();
        $mimeType = $file->getMimeType();

        SendInvoiceEmail::dispatch($emailTo, $data, $fileContent, $fileName, $mimeType, $mailerConfig);

        return response()->json(['message' => 'Invoice queued for sending.'], 202);
    }
}

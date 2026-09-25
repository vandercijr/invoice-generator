<?php

namespace App\Jobs;

use App\Mail\Invoice;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Throwable;

class SendInvoiceEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 1;

    public function __construct(
        private array $emailTo,
        private array $data,
        private string $base64PdfContent,
        private string $pdfName,
        private string $pdfMime,
        private array $mailerConfig,
    ) {
    }

    public function handle(): void
    {
        Config::set('mail.mailers.smtp', $this->mailerConfig);
        Mail::purge('smtp');

        Mail::to($this->emailTo)->send(
            new Invoice($this->data, base64_decode($this->base64PdfContent), $this->pdfName, $this->pdfMime)
        );
    }

    public function failed(Throwable $exception): void
    {
        Log::error('Failed to send invoice email', [
            'email_to' => $this->emailTo,
            'error' => $exception->getMessage(),
        ]);
    }
}

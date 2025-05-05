<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Attachment;

class Invoice extends Mailable
{
    use Queueable, SerializesModels;

    public array $data;
    protected string $pdfContent;
    protected string $pdfName;
    protected string $pdfMime;

    /**
     * Create a new message instance.
     */
    public function __construct(array $data, string $pdfContent, string $pdfName, string $pdfMime)
    {
        $this->data = $data;
        $this->pdfContent = $pdfContent;
        $this->pdfName = $pdfName;
        $this->pdfMime = $pdfMime;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address($this->data['username'], $this->data['name']),
            replyTo: [
                new Address($this->data['reply_to'],  $this->data['name']),
            ],
            subject: $this->data['subject'] ?? 'Invoice',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'email.invoice',
            with: ['data' => $this->data],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [
            Attachment::fromData(fn () => $this->pdfContent, $this->pdfName)
                ->withMime($this->pdfMime),
        ];
    }
}

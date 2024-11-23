<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class TestMailable extends Mailable
{
    use Queueable, SerializesModels;

    public $details = [];
    public $filePaths = [];


    /**
     * Create a new message instance.
     */
    public function __construct($details, $filePaths)
    {
        $this->details = $details;
        $this->filePaths = $filePaths;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->details['is_hiring'] ? 'New Hiring Candidate' : 'New Interested Client',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.testMailable',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        $attachments = [];
        foreach ($this->filePaths as $filePath) {
            $fullPath = storage_path('app/public/' . $filePath);
            $attachments[] = $fullPath;
        }
        return $attachments;
    }

     /* public function build()
    {
        $email = $this->view('emails.cliente_interesado')
                      ->with('details', $this->details);

        foreach ($this->attachments() as $filePath) {
            $email->attach($filePath, [
                'as' => basename($filePath),
                'mime' => mime_content_type($filePath),
            ]);
        }

        return $email;
    } */
}

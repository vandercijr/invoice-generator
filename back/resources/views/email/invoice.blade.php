<div class="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
    <p>
        Hi 

        Please find attached the  invoice regarding the period from  {{ \Carbon\Carbon::parse($data['worktime_from'])->format('F jS') }} to {{ \Carbon\Carbon::parse($data['worktime_to'])->format('F jS') }}

        Let me know if you have any questions

        Thanks,

        {{$data['name']}}
    </p>
</div>

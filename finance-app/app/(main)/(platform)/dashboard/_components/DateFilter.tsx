"use client"

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { PopoverClose } from '@radix-ui/react-popover'
import { format, subDays } from 'date-fns'
import { ChevronDown } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { ptBR } from "date-fns/locale"

export default function DateFilter() {
    const router = useRouter();
    const pathname = usePathname();

    const params = useSearchParams();
    const from = params.get("from") || "";
    const to = params.get("to") || "";

    const defaultTo = new Date();
    const defaultFrom = subDays(defaultTo, 30);

    const paramState = {
        from: from ? new Date(from) : defaultFrom,
        to: to ? new Date(to): defaultTo
    };

    const [date, setDate] = useState<DateRange | undefined>(paramState)

    const pushToUrl = (dateRange: DateRange | undefined) => {
        const query = {
            from: format(dateRange?.from || defaultFrom, "yyyy-MM-dd"),
            to: format(dateRange?.to || defaultTo, "yyyy-MM-dd")
        };

        const url = `${pathname}?from=${query.from}&to=${query.to}`

        router.push(url)
 
    }

  return (
    <Popover>
        <PopoverTrigger asChild>
            <Button
                disabled={false}
                size="sm"
                variant={"outline"}
                className='lg:w-auto w-full h-9 rounded-md px-3 font-normal  border focus:ring-offset-0 focus:ring-transparent outline-none'
            >
                {(date?.to&&date.from) && (
                    <span className='capitalize'> {format(date?.from!, "MMMM d ", { locale: ptBR })} {format(date?.to!, "- MMMM d, yyyy", { locale: ptBR })} </span>
                )}
                <ChevronDown className='ml-2 size-4 opacity-50' />
            </Button>
        </PopoverTrigger>
        <PopoverContent
            className='lg:w-auto w-full p-0'
            align='start'
        >
            <Calendar
                disabled={false}
                initialFocus
                mode='range'
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                locale={ptBR}
            />
            <div className="p-4 w-full flex items-center gap-x-2">
                <PopoverClose asChild>
                <Button
                    disabled={!date?.from || !date?.to}
                    className='w-full'
                    variant='outline'
                    onClick={() => pushToUrl(date)}
                >
                    Aplicar
                </Button>
                </PopoverClose>
            </div>
        </PopoverContent>
    </Popover>
  )
}

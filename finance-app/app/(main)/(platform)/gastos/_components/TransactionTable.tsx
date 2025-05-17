import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TransactionType } from '@/schema'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import React from 'react'


interface TransactionsProps {
    columns: ColumnDef<TransactionType>[]
    transactions: TransactionType[]
}

export default function TransactionTable({
    transactions, columns
}: TransactionsProps) {
    const table = useReactTable({
        data: transactions,
        columns: columns,
        getCoreRowModel: getCoreRowModel()
    })

  return (
    <div className="rounded-md border">
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )
                                    }
                                </TableHead>
                            )
                        })}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                            className='h-12'
                        >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ): (
                    <TableRow>
                        <TableCell>
                            Nenhum resultado
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </div>
  )
}

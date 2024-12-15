'use client'

import { useModal } from '@/app/providers/modal-provider'
import Workflowform from '@/components/forms/workflow-form'
import CustomModal from '@/components/global/custom-modal'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'

const WorkflowButton = () => {
  const { setOpen, setClose } = useModal()
  
  const handleClick = () => {
    setOpen(
      <CustomModal
        title="Create a Workflow Automation"
        subheading="Workflows are a powerfull that help you automate tasks."
      >
        <Workflowform />
      </CustomModal>
    )
  }

  return (
    <Button size={'icon'} onClick={handleClick}>
        <Plus />
        {/* <Editro state={state} /> */}
    </Button>
  )
}

export default WorkflowButton
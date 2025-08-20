import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../../components/ui/input';

import { Input } from '../../../../components/ui/input';

import { Button } from '../../../../components/ui/button';

function EditCourse({ initialTitle, initialDescription, open, onOpenChange, onSave, courseId }) {
  const [title, setTitle] = useState(initialTitle );
  const [desc, setDesc] = useState(initialDescription );

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/courses/${courseId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: title, description: desc })
      });
      if (!res.ok) {
        throw new Error('Failed to update course');
      }
    } catch (e) {
    } finally {
      onSave?.({ title, description: desc });
    }
  };

  return (
    <Dialog  open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Course Title & Description</DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-4 mt-2">
              <div>
                <label className="text-sm text-gray-600">Course Title</label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div>
                <label className="text-sm text-gray-600">Description</label>
                <textarea
                  className="w-full mt-1 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={6}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="secondary" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button onClick={handleSave}>Update</Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default EditCourse;

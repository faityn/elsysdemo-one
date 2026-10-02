"use client";
import AdminFrame, { Field, Panel, useAdminContent } from "./AdminFrame";
export default function AdminContact() {
  const [content, setContent] = useAdminContent();
  return (
    <AdminFrame section="contact" title="Холбоо барих">
      <Panel title="Холбоо барих мэдээлэл">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <Field
              label="Хаяг"
              value={content.contact.address}
              onChange={(value) =>
                setContent((current) => ({
                  ...current,
                  contact: { ...current.contact, address: value },
                }))
              }
            />
          </div>
          <Field
            label="Утас"
            value={content.contact.phone}
            onChange={(value) =>
              setContent((current) => ({
                ...current,
                contact: { ...current.contact, phone: value },
              }))
            }
          />
          <Field
            label="Имэйл"
            value={content.contact.email}
            onChange={(value) =>
              setContent((current) => ({
                ...current,
                contact: { ...current.contact, email: value },
              }))
            }
          />
        </div>
      </Panel>
    </AdminFrame>
  );
}

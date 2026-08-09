import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { services } from "@/data/services";

export default function ServicesAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {services.map((service) => (
        <AccordionItem
          key={service.slug}
          value={service.slug}
          className="terminal-accordion-item border-b-0"
        >
          <AccordionTrigger hideIcon className="terminal-accordion-trigger hover:no-underline">
            <span className="terminal-prompt-icon">&gt;</span>
            <span className="trigger-title text-[var(--terminal-green)] font-mono text-base">
              {service.title}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="pl-6 text-[var(--terminal-gray)] font-mono text-sm leading-relaxed">
              {service.description}
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

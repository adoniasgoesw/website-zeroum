import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ServiceCard from "@/components/Cards/ServiceCard";
import {
    SERVICES_CARDS_VIEWPORT,
    servicesRowHidden,
    servicesRowTransition,
    servicesRowVisible,
} from "@/constants/servicesMotion";
import { useServiceGridColumns } from "@/hooks/useServiceGridColumns";
import { chunkIntoRows } from "@/lib/chunkIntoRows";

export default function ServicesGrid({ services }) {
    const cols = useServiceGridColumns();
    const reduceMotion = useReducedMotion();

    const rows = useMemo(
        () => chunkIntoRows(services, cols),
        [services, cols],
    );

    const rowMotion = reduceMotion
        ? {}
        : {
              initial: servicesRowHidden,
              whileInView: servicesRowVisible,
              viewport: SERVICES_CARDS_VIEWPORT,
          };

    return (
        <div className="flex w-full flex-col gap-y-15">
            {rows.map((row, rowIndex) => (
                <motion.div
                    key={`services-row-${rowIndex}-${row.map((s) => s.id).join("-")}`}
                    className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4"
                    {...rowMotion}
                    transition={servicesRowTransition(rowIndex)}
                >
                    {row.map((service) => (
                        <ServiceCard key={service.id} {...service} />
                    ))}
                </motion.div>
            ))}
        </div>
    );
}

import ServiceImage from "../assets/Service.jpeg";

import ServiceImage01 from "../assets/service001.jpg";
import ServiceImage02 from "../assets/service002.jpg";
import ServiceImage03 from "../assets/service003.jpg";
import ServiceImage04 from "../assets/service004.jpg";


import ProductImage01 from "../assets/Product01.png";
import ProductImage02 from "../assets/Product02.jpg";
import ProductImage03 from "../assets/Product03.jpeg";
import ProductImage04 from "../assets/Product004.jpeg";
import ProductImage05 from "../assets/Product05.jpeg";
import ProductImage06 from "../assets/Product06.jpeg";
import ProductImage07 from "../assets/Product07.jpeg";


import SocialImage01 from "../assets/Social001.jpg";
import SocialImage02 from "../assets/Social002.jpeg";
import SocialImage03 from "../assets/Social003.JPG";
import SocialImage04 from "../assets/Social004.jpg";
import SocialImage05 from "../assets/Social005.jpg";
import SocialImage06 from "../assets/Social006.JPG";
import SocialImage07 from "../assets/Social008.png";
import SocialImage08 from "../assets/Social009.JPG";


import { FaHeart, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { MapPin } from "lucide-react";
import AboutImage1 from "../assets/About.jpeg";
import AboutImage2 from "../assets/About.jpeg";
import MidiakitPdf from "../assets/midiakit-zeroum (1).pdf";

export const navlinks = [
    { label: "Início", href: "#home",},
    { label: "Sobre", href: "#about" },
    { label: "Serviços", href: "#services" },
    { label: "Produtos", href: "#products" },
    { label: "Depoimentos", href: "#testimonials" },
    { label: "Social", href: "#social" },
    { label: "Parcerias", href: "#partners" },
    { label: "Contato", href: "#contact" },
]

export const services = [
    {
        id: 1,
        title: "Cabelo masculino",
        description: "Um corte pensado para combinar com a sua rotina e o visual que você quer manter.",
        image: ServiceImage01
    },
    {
        id: 2,
        title: "Cabelo feminino",
        description: "Serviço feito com cuidado e técnica, para manter o seu visual alinhado no dia a dia.",
        image: ServiceImage02
    },

    {
        id: 3,
        title: "Depilação e Sobrancelha",
        description: "Serviço feito com precisão para manter um visual limpo, natural e bem cuidado.",
        image: ServiceImage03
    },

    {
        id: 4,
        title: "Barba e Bigode",
        description: "Barba feita com cuidado, respeitando seu estilo e o formato do seu rosto.",
        image: ServiceImage04
    }
]




export const products = [
    {
        id: 1,
        title: "Cera Modeladora Matte Fox",
        category: "Cabelo",
        image: ProductImage01,
        description:
            "A Pomada Efeito Matte Fox For Men é ideal para homens que buscam fixação natural e acabamento fosco. Sua fórmula com cera vegetal oferece controle do frizz, fixação firme e visual moderno, sem deixar os fios pesados ou oleosos.",
    },

    {
        id: 2,
        title: "Pomada Efeito Seco Fox",
        category: "Cabelo",
        image: ProductImage02,
        description:
            "A Wax Efeito Toque Seco da Fox For Men proporciona fixação forte com acabamento natural e toque seco. Sua textura elástica garante flexibilidade para modelar penteados do dia a dia, mantendo os fios alinhados, hidratados e sem aspecto endurecido.",
    },

    {
        id: 3,
        title: "Pasta Premium Fox",
        category: "Cabelo",
        image: ProductImage03,
        description:
            "Desenvolvida à base de água para todos os tipos de cabelo, a Pasta Premium Fox For Men permite modelar e finalizar penteados com naturalidade. Possui brilho natural, fixação extra forte e ajuda a prevenir o ressecamento enquanto fortalece os fios.",
    },

    {
        id: 4,
        title: "Leave-In Fox",
        category: "Cabelo",
        image: ProductImage04,
        description:
            "Com silicones especiais e aminoácidos em sua fórmula, o Leave-In Fox For Men proporciona brilho intenso, redução do frizz e fios mais sedosos. Facilita a penteabilidade, melhora a modelagem e oferece fixação leve com acabamento natural.",
    },

    {
        id: 5,
        title: "Pó Modelador Fox",
        category: "Cabelo",
        image: ProductImage05,
        description:
            "O Pó Modelador Fox For Men foi desenvolvido para criar textura, volume e controle da oleosidade. Sua fórmula adere facilmente aos fios, proporciona acabamento seco e natural e não deixa resíduos, sendo ideal para penteados modernos.",
    },

    {
        id: 6,
        title: "Balm para Barba Fox",
        category: "Barba",
        image: ProductImage06,
        description:
            "O Balm para Barba Fox For Men hidrata, modela e controla os fios ao longo do dia. Indicado para barbas ressecadas ou ásperas, ajuda a reduzir o frizz, proporciona brilho saudável e mantém os fios alinhados com aparência natural.",
    },

    {
        id: 7,
        title: "Óleo para Barba Fox",
        category: "Barba",
        image: ProductImage07,
        description:
            "O Óleo para Barba Fox For Men possui ativos hidratantes que fortalecem, condicionam e disciplinam os fios. Combate o ressecamento sem deixar sensação pegajosa ou aspecto molhado, proporcionando brilho, maciez e uma fragrância suave.",
    },
];

export const testimonials = [
    {
        id: 1,
        name: "Leonardo Caparelli Elias",
        description:
            "Cortei o cabelo com o Leandro pela primeira vez e nunca mais troco de barbeiro. O cara é diferenciado. Além da qualidade do corte, o ambiente é muito agradável, com ar-condicionado, música boa e até um café excelente. Dá para perceber o cuidado em cada detalhe e isso faz toda a diferença na experiência.",
    },

    {
        id: 2,
        name: "Cássio Castro",
        description:
            "Leandro é barbeiro de confiança, desses que quando muda de endereco, a gente corre atrás! Corte impecável, barba na linha sempre respeitando o que o cliente sugere e o atendimento é diferenciado. O cara é muito gente boa e entende do que faz. O destaque também vai para o espaço, que é todo novo e muito bem montado. 5 estrelas sem dúvida!!",
    },

    {
        id: 3,
        name: "Luciana",
        description:
            "Fiz hidratação e corte. Adorei a experiência. Equipe muito atenciosa, ambiente agradável e com certeza voltarei",
    },

    {
        id: 5,
        name: "Bruna A.",
        description:
            "O espaço é incrível. Os atendimentos e qualidade são os diferenciais. Super recomendo.",
    },

    // Fictícias
    {
        id: 5,
        name: "Pedro Gatti",
        description:
            "Muito bom, excelentes barbeiros, lugar agradável e ótimo atendimento. Desde a recepção até a finalização do serviço, tudo é feito com atenção e profissionalismo. O ambiente é confortável, bem organizado e transmite confiança. Com certeza é um lugar que recomendo para quem busca qualidade, bom atendimento e uma experiência diferenciada."
    },
    {
        id: 6,
        name: "Felipe Andrade",
        description:
            "O que mais me chamou atenção foi a consistência. Não importa o dia ou o horário, o atendimento é sempre excelente e o resultado mantém o mesmo padrão de qualidade. O ambiente é agradável, moderno e transmite muito profissionalismo. Hoje é meu lugar de confiança para cuidar do visual.",
    },

    {
        id: 7,
        name: "Gustavo Henrique",
        description:
            "Desde o primeiro atendimento percebi que a proposta da Zero Um vai além de apenas cortar cabelo. Existe uma preocupação genuína em oferecer uma experiência completa. O ambiente é confortável, os profissionais são atenciosos e o resultado final sempre supera minhas expectativas. Recomendo sem hesitar.",
    },
];

export const social = [
    { id: 1, image: SocialImage01, alt: "Trabalho do salão — post 1" },
    { id: 2, image: SocialImage02, alt: "Trabalho do salão — post 2" },
    { id: 3, image: SocialImage03, alt: "Trabalho do salão — post 3" },
    { id: 4, image: SocialImage04, alt: "Trabalho do salão — post 4" },
    { id: 5, image: SocialImage05, alt: "Trabalho do salão — post 5" },
    { id: 6, image: SocialImage06, alt: "Trabalho do salão — post 6" },
    { id: 7, image: SocialImage07, alt: "Trabalho do salão — post 7" },
    { id: 8, image: SocialImage08, alt: "Trabalho do salão — post 8" },
];

/** Links externos: agenda, WhatsApp e mídia kit (sem URLs hardcoded nos componentes) */
export const links = {
    agenda: "https://www.trinks.com/zero-um1?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGnGVD-tn30aHU5fGcrPsxby8WbNor0jnkkLs_lmmxmxC2hzXjbTR0Ir5RjaMY_aem_RQwxQpLndw44T8aUDtrsHw",
    partnersPdf: MidiakitPdf,
    whatsapp: {
        phone: "5511981754327",
        display: "(11) 98175-4327",
        message:
            "Olá, tudo bem? Gostaria de agendar um horário.",
    },
    instagram: "https://www.instagram.com/zeroumstudiosp/",
};

export const contact = [
    {
        icon: <MapPin />,
        label: "Alameda Barão de Limeira, 721, Campos Elíseos, São Paulo - SP",
    },
    {
        icon: <FaWhatsapp />,
        label: links.whatsapp.display,
    },
    {
        icon: <FaInstagram />,
        label: "@zeroumstudiosp",
    }
];

/** Conteúdo da seção Sobre (card, textos e estatísticas) */
export const stats = [
    {
        id: 1,
        label: "Inaugurado em",
        value: "2025",
    },
    {
        id: 2,
        label: "Clientes atendidos",
        value: "200+",
    },
    {
        id: 3,
        label: "Resultado e precisão",
        value: "100%",
    },
]
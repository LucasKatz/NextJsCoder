export const products = [
    {
        title: `Colours`,
        description: `Flashcard to teach colours vocabulary`,
        //inStock: 100,
        price: 2500,
        slug: 'color-flashcard',
        image: 'colors.jpeg',
        category: 'vocabulary'
    },
    {
        title: `Feelings`,
        description: `Flashcard to teach feelings vocabulary`,
        //inStock: 100,
        price: 2300,
        slug: 'feelings-flashcard',
        image: 'feelings.jpeg',
        category: 'routine'
    },
    {
        title: `Monster`,
        description: `Monster Flashcard`,
        //inStock: 100,
        price: 1850,
        slug: 'monster-flashcard',
        image: 'monster.jpeg',
        category: 'stories'
    },
    {
        title: `Welcome`,
        description: `Welcome Sign`,
        //inStock: 100,
        price: 1500,
        slug: 'welcome-sign',
        image: 'welcome.jpeg',
        category: 'deco'
    },
    {
        title: `Aire acondicionado Likon mini split frío/calor 3000 frigorías blanco 220V LKS35WCCR`,
        description: `Climatizar tus espacios a lo largo del año es sin duda algo importante para tu comodidad y la de tus seres queridos. Contar con un aire acondicionado con función frío/calor es la mejor decisión. Con este aire Likon conseguí una mejor relación costo-beneficio.
        Diseño adecuado a tus espacios
        Contar con un mini split es adecuar tus necesidades de climatización al diseño y disponibilidad de tus espacios. Es un equipo compacto que se coloca en cualquier rincón de tu hogar con facilidad.
        Reducción de humedad
        El deshumidificador absorbe el agua del aire y disminuye la molesta humedad, creando un ambiente confortable y de calidad.`,
        inStock: 100,
        price: 354999,
        slug: 'aire-acondicionado-likon-mini-split-friocalor-3000-frigorias-blanco',
        image: 'aire-acondicionado-likon-mini-split-friocalor-3000-frigorias-blanco.webp',
        category: 'aires'
    },
    {
        title: `Aire acondicionado BGH Silent Air split frío/calor 3000 frigorías blanco 220V BS35WCCR`,
        description: `Diseño adecuado a tus espacios
        El tipo de aire split es de bajo consumo energético, de fácil mantenimiento y sumamente silencioso ya que cuenta con una unidad exterior.
        
        Reducción de humedad
        El deshumidificador absorbe el agua del aire y disminuye la molesta humedad, creando un ambiente confortable y de calidad.
        
        Programá de acuerdo a tus necesidades
        Cuando las personas descansan su temperatura corporal baja gradualmente. Por eso, este aire cuenta con la función sleep, que hace que la temperatura del ambiente aumente a medida que pasa el tiempo. No tendrás que levantarte a apagarlo y podrás disfrutar de un sueño placentero.`,
        inStock: 100,
        price: 442599,
        slug: 'aire-acondicionado-bgh-silent-air-split-friocalor-3000-frigorias-blanco',
        image: 'aire-acondicionado-bgh-silent-air-split-friocalor-3000-frigorias-blanco.webp',
        category: 'aires'
    },
    {
        title: `Horno de mesa eléctrico BGH BHE40M19 40L negro 220V-240V`,
        description: `Espacio reducido, cocción óptima
        Si tu cocina es pequeña, el horno de mesa es la mejor solución. Vas a disfrutar de las mismas ventajas que con uno convencional y ganarás practicidad y comodidad.
        Mantené el sabor
        Con su función de grill los alimentos quedarán dorados, crocantes y ricos. Las pizzas, quesadillas y tartas parecerán recién hechas.
        Que no se te pase
        El timer programable te va a ayudar a graduar los minutos indicados. Además, con el termostato ajustable vas a poder manejar el calor adecuado y lograr el punto justo.`,
        inStock: 100,
        price: 59399,
        slug: 'horno-de-mesa-electrico-bgh-bhe40m19-40l-negro',
        image: 'horno-de-mesa-electrico-bgh-bhe40m19-40l-negro.webp',
        category: 'hornos'
    },
    {
        title: `Horno de mesa eléctrico Peabody PE-HE4550 45L gris 220V`,
        description: `Espacio reducido, cocción óptima
        Si tu cocina es pequeña, el horno de mesa es la mejor solución. Vas a disfrutar de las mismas ventajas que con uno convencional y ganarás practicidad y comodidad.
        Tus recetas más sabrosas
        Lográ una cocción pareja en tus elaboraciones con su sistema por convección, que permite ahorrar tiempo y energía.`,
        inStock: 100,
        price: 65999,
        slug: 'horno-de-mesa-electrico-peabody-pe-he4550-45l-gris',
        image: 'horno-de-mesa-electrico-peabody-pe-he4550-45l-gris.webp',
        category: 'hornos'
    },
    {
        title: `Atma Hga3022 Horno Grill 30 Litros 1500w Timer 60 Min`,
        description: `Disfruta de deliciosas comidas caseras con el horno Atma HGA3022PI, un horno eléctrico de mesa con grill y una capacidad de 30 litros, ideal para cocinar una amplia variedad de platos. Con sus 1500W de potencia, podrás preparar tus recetas favoritas de manera rápida y eficiente. El temporizador de 60 minutos te permite controlar el tiempo de cocción, asegurando resultados perfectos en cada uso. Además, su diseño compacto y elegante se adapta perfectamente a cualquier espacio de tu cocina, mientras que su material de fácil limpieza te permite mantenerlo siempre impecable. Sus dimensiones de 498 mm de ancho, 365 mm de profundidad y 328 mm de altura lo hacen práctico y fácil de ubicar. No esperes más para disfrutar de la comodidad y versatilidad que este horno Atma te ofrece en tu hogar.`,
        inStock: 100,
        price: 53879,
        slug: 'atma-hga3022-horno-grill-30-litros-1500w',
        image: 'atma-hga3022-horno-grill-30-litros-1500w.webp',
        category: 'hornos'
    },
]

export const getProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products)
        }, 2000)
    })
}

export const getProductById = (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products.find (prod => prod.id === id))
        }, 2000)
    })
}
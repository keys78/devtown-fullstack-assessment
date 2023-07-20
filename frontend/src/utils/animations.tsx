export const modalVariants = {
    initial: {
      opactity: 0,
      x: "-100vw",
    },
    final: {
      opactity: 1,
      x: 0,
      transition: { duration: 0.4, delay: 0}
    },
    exit: {
      opactity: 0,
      x: "-100vw",
      transition: { duration: 0.4, delay: 0.2 },
    }
  };

  export const backdropVariant2 = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };
  

export const modalVariant = {
    hidden: {
        y: "-200px",
    },
    visible: {
        y: 0,
        transition: {
            duration: 0.25,
        },
    },
};

export const modalVariantsShort = {
    initial: {
      opactity: 0,
      x: "-10vw",
    },
    final: {
      opactity: 1,
      x: 0,
      transition: { duration: 0.4, delay: 0}
    },
    exit: {
      opactity: 0,
      x: "-10vw",
      transition: { duration: 0.2, delay: 0.1 },
    }
  };

export const searchBarVariants = {
    initial: {
      opactity: 0,
      y: "-100vh",
    },
    final: {
      opactity: 1,
      y: 0,
      transition: { duration: 0.4, delay: 0}
    },
    exit: {
      opactity: 0,
      y: "-100vh",
      transition: { duration: 0.4, delay: 0.2 },
    }
  };

  export const backdropVariant = {
    hidden: {
        opacity: 0,
        transition: { duration: 0.4, delay: 0.2 },

    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
        },
    },
};

export const menuVariations = {
  closed: {
      opacity: 0,
      y: -10,
      pointerEvents: 'none',
      transition: { duration: 0.2, delay: 0.2 }
  },
  open: {
      opacity: 1,
      y: 0,
      pointerEvents: 'auto',
      transition: { duration: 0.2 }
  },
};
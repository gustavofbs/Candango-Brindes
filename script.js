// Dados dos produtos (exemplo)
const produtos = [
    {
        nome: 'Caneca Personalizada',
        descricao: 'Caneca de cerâmica com sua logo',
        imagem: 'https://via.placeholder.com/300x200?text=Caneca+Personalizada'
    },
    {
        nome: 'Agenda 2024',
        descricao: 'Agenda corporativa personalizada',
        imagem: 'https://via.placeholder.com/300x200?text=Agenda+2024'
    },
    {
        nome: 'Squeeze',
        descricao: 'Squeeze de alumínio personalizado',
        imagem: 'https://via.placeholder.com/300x200?text=Squeeze'
    },
    {
        nome: 'Camiseta',
        descricao: 'Camiseta com estampa personalizada',
        imagem: 'https://via.placeholder.com/300x200?text=Camiseta'
    },
    {
        nome: 'Chaveiro',
        descricao: 'Chaveiro personalizado com sua marca',
        imagem: 'https://via.placeholder.com/300x200?text=Chaveiro'
    },
    {
        nome: 'Mouse Pad',
        descricao: 'Mouse pad ergonômico personalizado',
        imagem: 'https://via.placeholder.com/300x200?text=Mouse+Pad'
    }
];

// Função para criar os cards de produtos
function criarProdutos() {
    const container = document.getElementById('produtos-container');
    
    produtos.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'produto-card';
        
        card.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}" class="produto-img">
            <div class="produto-info">
                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Configurar o botão do WhatsApp
function configurarWhatsApp() {
    const whatsappBtn = document.getElementById('whatsapp-btn');
    const mensagem = encodeURIComponent('Olá! Gostaria de saber mais sobre os produtos da Candango Brindes.');
    const telefone = '5561999999999'; // Substitua pelo número real
    
    whatsappBtn.href = `https://wa.me/${telefone}?text=${mensagem}`;
}

// Inicializar quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    criarProdutos();
    configurarWhatsApp();
});

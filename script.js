// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC_MFwqPPha1LDjOKlDiIw10siWXjyKcLQ",
    authDomain: "candango-brindes.firebaseapp.com",
    projectId: "candango-brindes",
    storageBucket: "candango-brindes.firebasestorage.app",
    messagingSenderId: "706946113003",
    appId: "1:706946113003:web:2756a03ddac625a5734dae",
    measurementId: "G-W3BWETM9Z1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

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

// Login Modal
const loginModal = document.getElementById('loginModal');
const adminModal = document.getElementById('adminModal');
const loginBtn = document.getElementById('loginBtn');
const closeBtns = document.querySelectorAll('.close');

if (loginBtn) {
    loginBtn.onclick = () => {
        loginModal.style.display = 'block';
    };
} else {
    console.error("Elemento #loginBtn não encontrado!");
}

closeBtns.forEach(btn => {
    btn.onclick = function() {
        loginModal.style.display = 'none';
        adminModal.style.display = 'none';
    }
});

window.onclick = (event) => {
    if (event.target == loginModal) {
        loginModal.style.display = 'none';
    }
    if (event.target == adminModal) {
        adminModal.style.display = 'none';
    }
};

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        await auth.signInWithEmailAndPassword(email, password);
        loginModal.style.display = 'none';
        adminModal.style.display = 'block';
        loadProducts();
    } catch (error) {
        alert('Erro no login: ' + error.message);
    }
});

// Handle adding new product
document.getElementById('addProductForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const product = {
        nome: document.getElementById('productName').value,
        descricao: document.getElementById('productDescription').value,
        imagem: document.getElementById('productImage').value
    };

    try {
        await db.collection('produtos').add(product);
        document.getElementById('addProductForm').reset();
        loadProducts();
        alert('Produto adicionado com sucesso!');
    } catch (error) {
        alert('Erro ao adicionar produto: ' + error.message);
    }
});

// Load products from Firestore
async function loadProducts() {
    const container = document.getElementById('produtos-container');
    container.innerHTML = '';
    
    try {
        const snapshot = await db.collection('produtos').get();
        snapshot.forEach(doc => {
            const produto = doc.data();
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

            // Add edit/delete buttons for admin panel
            if (auth.currentUser) {
                const adminCard = document.createElement('div');
                adminCard.className = 'admin-product-card';
                adminCard.innerHTML = `
                    <h3>${produto.nome}</h3>
                    <button onclick="deleteProduct('${doc.id}')">Excluir</button>
                `;
                document.getElementById('productsList').appendChild(adminCard);
            }
        });
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

// Delete product
async function deleteProduct(productId) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
        try {
            await db.collection('produtos').doc(productId).delete();
            loadProducts();
            alert('Produto excluído com sucesso!');
        } catch (error) {
            alert('Erro ao excluir produto: ' + error.message);
        }
    }
}

// Auth state observer
auth.onAuthStateChanged(user => {
    loginBtn.textContent = user ? 'Painel Admin' : 'Login Admin';
    if (user) {
        loginBtn.onclick = () => {
            adminModal.style.display = 'block';
            loadProducts();
        };
    } else {
        loginBtn.onclick = () => {
            loginModal.style.display = 'block';
        };
    }
});

// Configurar o botão do WhatsApp
function configurarWhatsApp() {
    const whatsappBtn = document.getElementById('whatsapp-btn');
    const mensagem = encodeURIComponent('Olá! Gostaria de saber mais sobre os produtos da Candango Brindes.');
    const telefone = '5561999999999'; // Substitua pelo número real
    
    whatsappBtn.href = `https://wa.me/${telefone}?text=${mensagem}`;
}

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    configurarWhatsApp();
});

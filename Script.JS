// إظهار شاشة تسجيل الدخول بعد الترحيب
setTimeout(() => {
  document.getElementById('welcome').classList.add('hidden');
  document.getElementById('login').classList.remove('hidden');
}, 3000);

// إعداد الفاتورة الأولى
let invoiceNumber = localStorage.getItem('invoiceNumber') || 1;
document.getElementById('invoice-number').value = invoiceNumber;

function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  if (user && pass) {
    document.getElementById('login').classList.add('hidden');
    document.getElementById('main').classList.remove('hidden');
  } else {
    alert('الرجاء إدخال اسم المستخدم وكلمة المرور.');
  }
}

function closeApp() {
  alert('لا يمكن إغلاق البرنامج من المتصفح مباشرة.');
}

function showSettings() {
  document.getElementById('main').classList.add('hidden');
  document.getElementById('settings').classList.remove('hidden');
}

function showDataEntry() {
  document.getElementById('main').classList.add('hidden');
  document.getElementById('data-entry').classList.remove('hidden');
  document.getElementById('invoice-number').value = invoiceNumber;
}

function showReport() {
  document.getElementById('main').classList.add('hidden');
  document.getElementById('report').classList.remove('hidden');
  renderTable();
}

function backToMain() {
  document.getElementById('settings').classList.add('hidden');
  document.getElementById('data-entry').classList.add('hidden');
  document.getElementById('report').classList.add('hidden');
  document.getElementById('main').classList.remove('hidden');
}

function addCustomer() {
  const name = document.getElementById('customer-name').value;
  const phone = document.getElementById('customer-phone').value;
  const animal = document.getElementById('animal-type').value;
  const cutType = document.getElementById('cut-type').value;

  if (!name || !phone) {
    alert('الرجاء إدخال جميع البيانات.');
    return;
  }

  const customers = JSON.parse(localStorage.getItem('customers')) || [];

  customers.push({
    invoice: invoiceNumber,
    name,
    phone,
    animal,
    cutType
  });

  localStorage.setItem('customers', JSON.stringify(customers));

  invoiceNumber++;
  localStorage.setItem('invoiceNumber', invoiceNumber);

  document.getElementById('customer-name').value = '';
  document.getElementById('customer-phone').value = '';
  document.getElementById('invoice-number').value = invoiceNumber;

  alert('تمت إضافة البيانات بنجاح.');
}

function renderTable() {
  const customers = JSON.parse(localStorage.getItem('customers')) || [];
  const table = document.getElementById('report-table');

  // Clear old rows except the header
  table.innerHTML = `
    <tr>
      <th>رقم الفاتورة</th>
      <th>اسم المتعامل</th>
      <th>رقم التليفون</th>
      <th>نوع الذبيحة</th>
      <th>نوع التقطيع</th>
    </tr>
  `;

  customers.forEach(c => {
    const row = table.insertRow(-1);
    row.insertCell(0).innerText = c.invoice;
    row.insertCell(1).innerText = c.name;
    row.insertCell(2).innerText = c.phone;
    row.insertCell(3).innerText = c.animal;
    row.insertCell(4).innerText = c.cutType;
  });
}

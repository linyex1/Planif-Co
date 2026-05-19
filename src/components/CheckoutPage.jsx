import { ArrowLeft, LockKeyhole, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  cardNumber: '',
  expiry: '',
  cvc: '',
};

function formatCardNumber(value) {
  return value
    .replace(/\D/g, '')
    .slice(0, 19)
    .replace(/(.{4})/g, '$1 ')
    .trim();
}

function validateForm(values) {
  const errors = {};
  const cardDigits = values.cardNumber.replace(/\s/g, '');

  if (!values.firstName.trim()) errors.firstName = 'Prénom requis.';
  if (!values.lastName.trim()) errors.lastName = 'Nom requis.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Adresse email invalide.';
  if (!/^\d{13,19}$/.test(cardDigits)) errors.cardNumber = 'Carte : 13 à 19 chiffres attendus.';
  if (!/^(0[1-9]|1[0-2])\/(\d{2}|\d{4})$/.test(values.expiry)) {
    errors.expiry = 'Format attendu : MM/AA.';
  }
  if (!/^\d{3,4}$/.test(values.cvc)) errors.cvc = 'CVC : 3 ou 4 chiffres.';

  return errors;
}

function CheckoutPage({ item, onBackToCart, onSubmitOrder }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    const nextValue = field === 'cardNumber' ? formatCardNumber(value) : value;
    setForm((current) => ({ ...current, [field]: nextValue }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const submittedValues = Object.fromEntries(new FormData(event.currentTarget));
    const nextErrors = validateForm(submittedValues);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      onSubmitOrder();
      setForm(initialForm);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F4EF] px-4 pb-20 pt-32 sm:px-6 lg:pt-36">
      <section className="mx-auto max-w-7xl">
        <button
          type="button"
          onClick={onBackToCart}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-bold text-[#030712] transition hover:-translate-y-0.5 hover:border-[#030712]"
        >
          <ArrowLeft size={16} />
          Retour au panier
        </button>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <aside className="rounded-[2rem] bg-[#030712] p-7 text-white shadow-[0_22px_70px_rgba(3,7,18,0.18)] sm:p-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-[#D7FF4F]">
              <ShieldCheck size={16} />
              Paiement 100% simulé
            </span>
            <h1 className="mt-6 text-4xl font-black tracking-tight">Finaliser la commande</h1>
            <p className="mt-4 leading-7 text-white/64">
              Aucun prélèvement ne sera effectué. Les informations saisies servent uniquement
              à tester le parcours et ne sont pas enregistrées.
            </p>

            <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5">
              <p className="text-sm font-black uppercase text-white/48">Commande</p>
              <h2 className="mt-3 text-2xl font-black">{item?.name}</h2>
              <div className="mt-5 flex items-end justify-between">
                <span className="text-white/60">Total simulé</span>
                <span className="text-5xl font-black">{item?.price ?? 0} €</span>
              </div>
            </div>
          </aside>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_22px_70px_rgba(3,7,18,0.10)] sm:p-8"
          >
            <div className="mb-8 flex items-center gap-3">
              <div className="grid size-12 place-items-center rounded-2xl bg-[#D7FF4F] text-[#030712]">
                <LockKeyhole size={22} />
              </div>
              <div>
                <p className="text-sm font-black uppercase text-[#6B7280]">Informations</p>
                <h2 className="text-3xl font-black text-[#030712]">Paiement fictif</h2>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="font-bold text-[#111827]">Prénom</span>
                <input
                  value={form.firstName}
                  name="firstName"
                  onChange={(event) => updateField('firstName', event.target.value)}
                  className="rounded-2xl border border-black/10 bg-[#FAF8F3] px-4 py-4 font-semibold outline-none transition focus:border-[#030712] focus:bg-white"
                  placeholder="Camille"
                />
                {errors.firstName && <span className="text-sm font-semibold text-[#D72638]">{errors.firstName}</span>}
              </label>

              <label className="grid gap-2">
                <span className="font-bold text-[#111827]">Nom</span>
                <input
                  value={form.lastName}
                  name="lastName"
                  onChange={(event) => updateField('lastName', event.target.value)}
                  className="rounded-2xl border border-black/10 bg-[#FAF8F3] px-4 py-4 font-semibold outline-none transition focus:border-[#030712] focus:bg-white"
                  placeholder="Martin"
                />
                {errors.lastName && <span className="text-sm font-semibold text-[#D72638]">{errors.lastName}</span>}
              </label>

              <label className="grid gap-2 sm:col-span-2">
                <span className="font-bold text-[#111827]">Adresse email</span>
                <input
                  value={form.email}
                  name="email"
                  onChange={(event) => updateField('email', event.target.value)}
                  className="rounded-2xl border border-black/10 bg-[#FAF8F3] px-4 py-4 font-semibold outline-none transition focus:border-[#030712] focus:bg-white"
                  placeholder="camille@example.com"
                  inputMode="email"
                  type="text"
                />
                {errors.email && <span className="text-sm font-semibold text-[#D72638]">{errors.email}</span>}
              </label>

              <label className="grid gap-2 sm:col-span-2">
                <span className="font-bold text-[#111827]">Numéro de carte</span>
                <input
                  value={form.cardNumber}
                  name="cardNumber"
                  onChange={(event) => updateField('cardNumber', event.target.value)}
                  className="rounded-2xl border border-black/10 bg-[#FAF8F3] px-4 py-4 font-semibold outline-none transition focus:border-[#030712] focus:bg-white"
                  inputMode="numeric"
                  placeholder="4242 4242 4242 4242"
                />
                {errors.cardNumber && <span className="text-sm font-semibold text-[#D72638]">{errors.cardNumber}</span>}
              </label>

              <label className="grid gap-2">
                <span className="font-bold text-[#111827]">Expiration</span>
                <input
                  value={form.expiry}
                  name="expiry"
                  onChange={(event) => updateField('expiry', event.target.value)}
                  className="rounded-2xl border border-black/10 bg-[#FAF8F3] px-4 py-4 font-semibold outline-none transition focus:border-[#030712] focus:bg-white"
                  inputMode="numeric"
                  placeholder="12/29"
                />
                {errors.expiry && <span className="text-sm font-semibold text-[#D72638]">{errors.expiry}</span>}
              </label>

              <label className="grid gap-2">
                <span className="font-bold text-[#111827]">CVC</span>
                <input
                  value={form.cvc}
                  name="cvc"
                  onChange={(event) => updateField('cvc', event.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="rounded-2xl border border-black/10 bg-[#FAF8F3] px-4 py-4 font-semibold outline-none transition focus:border-[#030712] focus:bg-white"
                  inputMode="numeric"
                  placeholder="123"
                />
                {errors.cvc && <span className="text-sm font-semibold text-[#D72638]">{errors.cvc}</span>}
              </label>
            </div>

            <div className="mt-6 rounded-3xl bg-[#D8F3FF] p-4 text-sm font-semibold leading-6 text-[#0A2342]">
              Simulation : le paiement sera accepté si les formats sont valides. Aucune carte
              bancaire, identité ou adresse email n’est conservée.
            </div>

            <button
              type="submit"
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#030712] px-6 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-[#0A2342]"
            >
              Valider le paiement simulé
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default CheckoutPage;

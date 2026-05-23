import math
import re
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
    Flowable,
)


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "pdfs"
FONT_PATH = Path("/Library/Fonts/Arial Unicode.ttf")
if not FONT_PATH.exists():
    FONT_PATH = Path("/System/Library/Fonts/Supplemental/Arial Unicode.ttf")

pdfmetrics.registerFont(TTFont("Planif", str(FONT_PATH)))
pdfmetrics.registerFont(TTFont("Planif-Bold", str(FONT_PATH)))

PAGE_WIDTH, PAGE_HEIGHT = A4
MARGIN_X = 1.5 * cm
TEXT_WIDTH = PAGE_WIDTH - 2 * MARGIN_X


styles = getSampleStyleSheet()
styles.add(
    ParagraphStyle(
        name="ModuleTitle",
        fontName="Planif-Bold",
        fontSize=26,
        leading=31,
        textColor=colors.HexColor("#030712"),
        spaceAfter=8,
    )
)
styles.add(
    ParagraphStyle(
        name="SectionTitle",
        fontName="Planif-Bold",
        fontSize=15,
        leading=19,
        textColor=colors.HexColor("#0A2342"),
        spaceBefore=12,
        spaceAfter=8,
    )
)
styles.add(
    ParagraphStyle(
        name="Body",
        fontName="Planif",
        fontSize=9.5,
        leading=14,
        textColor=colors.HexColor("#111827"),
    )
)
styles.add(
    ParagraphStyle(
        name="Small",
        fontName="Planif",
        fontSize=8.2,
        leading=11,
        textColor=colors.HexColor("#111827"),
    )
)
styles.add(
    ParagraphStyle(
        name="PdfBullet",
        fontName="Planif",
        fontSize=9.2,
        leading=13,
        leftIndent=12,
        firstLineIndent=-8,
        textColor=colors.HexColor("#111827"),
    )
)
styles.add(
    ParagraphStyle(
        name="TableCell",
        fontName="Planif",
        fontSize=7.8,
        leading=10.2,
        textColor=colors.HexColor("#111827"),
    )
)
styles.add(
    ParagraphStyle(
        name="TableHead",
        fontName="Planif-Bold",
        fontSize=7.8,
        leading=10.2,
        alignment=TA_CENTER,
        textColor=colors.white,
    )
)


def clean_text(text):
    text = str(text)
    text = re.sub(r"<br\s*/?>", "\n", text)
    text = re.sub(r"</?(b|strong|em|i|span|sup|sub)[^>]*>", "", text)
    text = re.sub(r"<[^>]+>", "", text)
    return text


def p(text, style="Body"):
    return Paragraph(escape(clean_text(text)).replace("\n", "<br/>"), styles[style])


def bullet(text):
    return p(f"• {text}", "PdfBullet")


def section(title):
    return p(title, "SectionTitle")


def para_table(rows, widths=None, header=True, dark=False):
    data = []
    for r, row in enumerate(rows):
      style_name = "TableHead" if header and r == 0 else "TableCell"
      data.append([p(cell, style_name) for cell in row])

    if widths is None:
        widths = [TEXT_WIDTH / len(rows[0])] * len(rows[0])

    table = Table(data, colWidths=widths, repeatRows=1 if header else 0, hAlign="LEFT")
    head_color = colors.HexColor("#0A2342") if not dark else colors.HexColor("#030712")
    body_color = colors.HexColor("#FAF8F3") if not dark else colors.HexColor("#F3F4F6")
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), head_color),
                ("BACKGROUND", (0, 1), (-1, -1), body_color),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#D1D5DB")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    return table


def callout(title, lines, bg="#F7F4EF"):
    rows = [[p(title, "TableHead")], [p("\n".join(lines), "Small")]]
    table = Table(rows, colWidths=[TEXT_WIDTH], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#030712")),
                ("BACKGROUND", (0, 1), (-1, -1), colors.HexColor(bg)),
                ("BOX", (0, 0), (-1, -1), 0.8, colors.HexColor("#D1D5DB")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    return table


def header_footer(canvas, doc, title):
    canvas.saveState()
    canvas.setFont("Planif", 7.5)
    canvas.setFillColor(colors.HexColor("#6B7280"))
    canvas.drawString(MARGIN_X, 0.9 * cm, "Planif&Co — Master 1 MSI — Planification & Contrôle")
    canvas.drawRightString(PAGE_WIDTH - MARGIN_X, 0.9 * cm, f"{title} · page {doc.page}")
    canvas.restoreState()


def build_pdf(filename, title, blocks):
    doc = SimpleDocTemplate(
        str(OUT_DIR / filename),
        pagesize=A4,
        leftMargin=MARGIN_X,
        rightMargin=MARGIN_X,
        topMargin=1.3 * cm,
        bottomMargin=1.4 * cm,
        title=title,
        author="Planif&Co",
    )
    story = [p("Planif&Co", "Small"), p(title, "ModuleTitle")]
    for block in blocks:
        story.extend(block)
    doc.build(story, onFirstPage=lambda c, d: header_footer(c, d, title), onLaterPages=lambda c, d: header_footer(c, d, title))


def concept_grid(items):
    rows = []
    for i in range(0, len(items), 2):
        left = items[i]
        right = items[i + 1] if i + 1 < len(items) else ("", "")
        rows.append([
            p(f"{left[0]}\n{left[1]}", "Small"),
            p(f"{right[0]}\n{right[1]}", "Small") if right[0] else "",
        ])
    table = Table(rows, colWidths=[TEXT_WIDTH / 2 - 4, TEXT_WIDTH / 2 - 4], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#FAF8F3")),
                ("BOX", (0, 0), (-1, -1), 0.5, colors.HexColor("#E5E7EB")),
                ("INNERGRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#E5E7EB")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    return table


class BudgetFlowFlowable(Flowable):
    def __init__(self, width=TEXT_WIDTH, height=4.5 * cm):
        super().__init__()
        self.width = width
        self.height = height

    def wrap(self, availWidth, availHeight):
        return self.width, self.height

    def draw(self):
        c = self.canv
        c.saveState()
        c.setFillColor(colors.HexColor("#030712"))
        c.roundRect(0, 0, self.width, self.height, 18, stroke=0, fill=1)
        items = [
            ("Ventes", "#D7FF4F"),
            ("Production", "#D8F3FF"),
            ("Achats", "#FFFFFF"),
            ("TVA", "#A7A5FF"),
            ("Trésorerie", "#D7FF4F"),
        ]
        gap = 9
        box_w = (self.width - gap * (len(items) + 1)) / len(items)
        y = self.height / 2 - 18
        for i, (label, color) in enumerate(items):
            x = gap + i * (box_w + gap)
            c.setFillColor(colors.HexColor(color))
            c.roundRect(x, y, box_w, 36, 12, stroke=0, fill=1)
            c.setFillColor(colors.HexColor("#030712"))
            c.setFont("Planif-Bold", 8.5)
            c.drawCentredString(x + box_w / 2, y + 14, label)
            if i < len(items) - 1:
                ax = x + box_w + 2
                c.setStrokeColor(colors.white)
                c.setLineWidth(1.2)
                c.line(ax, y + 18, ax + gap - 4, y + 18)
                c.line(ax + gap - 4, y + 18, ax + gap - 8, y + 21)
                c.line(ax + gap - 4, y + 18, ax + gap - 8, y + 15)
        c.setFillColor(colors.white)
        c.setFont("Planif-Bold", 11)
        c.drawString(16, self.height - 26, "Articulation budgétaire")
        c.setFont("Planif", 7.8)
        c.setFillColor(colors.HexColor("#D1D5DB"))
        c.drawString(16, 18, "Objectif : transformer les prévisions d’activité en flux financiers et en trésorerie.")
        c.restoreState()


class VarianceBarsFlowable(Flowable):
    def __init__(self, width=TEXT_WIDTH, height=4.2 * cm):
        super().__init__()
        self.width = width
        self.height = height

    def wrap(self, availWidth, availHeight):
        return self.width, self.height

    def draw(self):
        c = self.canv
        c.saveState()
        c.setFillColor(colors.HexColor("#030712"))
        c.roundRect(0, 0, self.width, self.height, 18, stroke=0, fill=1)
        c.setFillColor(colors.white)
        c.setFont("Planif-Bold", 11)
        c.drawString(16, self.height - 25, "Lecture des écarts")
        bars = [
            ("Écart sur prix", 270, "#D72638"),
            ("Écart sur quantité", -80, "#D7FF4F"),
            ("Écart global", 190, "#A7A5FF"),
        ]
        max_abs = 300
        axis_x = self.width * 0.52
        top = self.height - 52
        c.setStrokeColor(colors.HexColor("#6B7280"))
        c.line(axis_x, 24, axis_x, top + 8)
        for i, (label, value, color) in enumerate(bars):
            y = top - i * 31
            c.setFillColor(colors.HexColor("#D1D5DB"))
            c.setFont("Planif-Bold", 8.2)
            c.drawRightString(axis_x - 12, y - 2, label)
            bar_w = abs(value) / max_abs * (self.width * 0.34)
            if value >= 0:
                x = axis_x
            else:
                x = axis_x - bar_w
            c.setFillColor(colors.HexColor(color))
            c.roundRect(x, y - 7, bar_w, 14, 7, stroke=0, fill=1)
            c.setFillColor(colors.white)
            c.drawString(axis_x + (bar_w if value >= 0 else 8) + 8, y - 3, f"{value:+} €")
        c.restoreState()


class BcgMatrixFlowable(Flowable):
    def __init__(self, width=TEXT_WIDTH, height=9.2 * cm):
        super().__init__()
        self.width = width
        self.height = height

    def wrap(self, availWidth, availHeight):
        return self.width, self.height

    def draw(self):
        c = self.canv
        c.saveState()
        c.setFillColor(colors.HexColor("#030712"))
        c.roundRect(0, 0, self.width, self.height, 22, stroke=0, fill=1)
        pad = 28
        plot_x = pad + 20
        plot_y = 32
        plot_w = self.width - 2 * pad - 20
        plot_h = self.height - 62
        mid_x = plot_x + plot_w * 0.5
        mid_y = plot_y + plot_h * 0.48
        c.setStrokeColor(colors.HexColor("#6B7280"))
        c.setLineWidth(0.8)
        c.line(plot_x, mid_y, plot_x + plot_w, mid_y)
        c.line(mid_x, plot_y, mid_x, plot_y + plot_h)

        labels = [
            ("Vedette", plot_x + 8, plot_y + plot_h - 30, "#D7FF4F"),
            ("Dilemme", mid_x + 22, plot_y + plot_h - 30, "#A7A5FF"),
            ("Vache à lait", plot_x + 8, plot_y + 12, "#D8F3FF"),
            ("Poid mort", mid_x + 22, plot_y + 12, "#FFFFFF"),
        ]
        for text, x, y, color in labels:
            c.setFillColor(colors.HexColor(color))
            c.roundRect(x, y, 80, 22, 11, stroke=0, fill=1)
            c.setFillColor(colors.HexColor("#030712"))
            c.setFont("Planif-Bold", 8)
            c.drawCentredString(x + 40, y + 7, text)

        c.setFillColor(colors.HexColor("#D1D5DB"))
        c.setFont("Planif-Bold", 8)
        c.drawString(plot_x, self.height - 22, "Matrice BCG — seuil TC : 10 % | seuil PMR : 1")
        c.drawCentredString(plot_x + plot_w / 2, 10, "PART DE MARCHÉ RELATIVE")
        c.saveState()
        c.translate(12, plot_y + plot_h / 2)
        c.rotate(90)
        c.drawCentredString(0, 0, "TAUX DE CROISSANCE")
        c.restoreState()

        bubbles = [
            ("DAS 1", "PMR 1,23 | TC 15 %", plot_x + plot_w * 0.33, mid_y + plot_h * 0.18, 37, "#D7FF4F"),
            ("DAS 3", "PMR 0,75 | TC 40 %", mid_x + plot_w * 0.23, mid_y + plot_h * 0.33, 31, "#A7A5FF"),
            ("DAS 2", "PMR 0,74 | TC 5 %", mid_x + plot_w * 0.22, plot_y + plot_h * 0.18, 34, "#FFFFFF"),
        ]
        for title, detail, x, y, r, color in bubbles:
            c.setFillColor(colors.HexColor(color))
            c.circle(x, y, r, stroke=0, fill=1)
            c.setFillColor(colors.HexColor("#030712"))
            c.setFont("Planif-Bold", 14)
            c.drawCentredString(x, y + 6, title)
            c.setFont("Planif-Bold", 6.8)
            c.drawCentredString(x, y - 10, detail)
        c.restoreState()


class MpmNetworkFlowable(Flowable):
    def __init__(self, width=TEXT_WIDTH, height=8.4 * cm):
        super().__init__()
        self.width = width
        self.height = height

    def wrap(self, availWidth, availHeight):
        return self.width, self.height

    def draw_node(self, c, x, y, w, h, title, subtitle, early, late, color):
        c.setFillColor(colors.HexColor("#10131A"))
        c.setStrokeColor(colors.HexColor(color))
        c.setLineWidth(1.3)
        c.roundRect(x, y, w, h, 10, stroke=1, fill=1)
        c.setFillColor(colors.white)
        c.setFont("Planif-Bold", 12 if len(title) == 1 else 8.5)
        c.drawCentredString(x + w / 2, y + h - 18, title)
        if subtitle:
            c.setFont("Planif-Bold", 5.7)
            for i, line in enumerate(subtitle):
                c.drawCentredString(x + w / 2, y + h - 35 - i * 8, line)
        c.setStrokeColor(colors.HexColor("#6B7280"))
        c.line(x, y + 28, x + w, y + 28)
        c.line(x + w / 2, y, x + w / 2, y + 28)
        c.setFont("Planif-Bold", 6.5)
        c.drawCentredString(x + w * 0.25, y + 18, "DTO")
        c.drawCentredString(x + w * 0.75, y + 18, "DTA")
        c.setFont("Planif-Bold", 9.5)
        c.drawCentredString(x + w * 0.25, y + 6, early)
        c.drawCentredString(x + w * 0.75, y + 6, late)

    def arrow(self, c, x1, y1, x2, y2, label=None):
        c.setStrokeColor(colors.white)
        c.setFillColor(colors.white)
        c.setLineWidth(1.2)
        c.line(x1, y1, x2, y2)
        angle = math.atan2(y2 - y1, x2 - x1)
        size = 5
        p1 = (x2, y2)
        p2 = (x2 - size * math.cos(angle - 0.45), y2 - size * math.sin(angle - 0.45))
        p3 = (x2 - size * math.cos(angle + 0.45), y2 - size * math.sin(angle + 0.45))
        c.line(*p1, *p2)
        c.line(*p1, *p3)
        if label:
            c.setFont("Planif-Bold", 6.8)
            c.drawCentredString((x1 + x2) / 2, (y1 + y2) / 2 + 5, label)

    def draw(self):
        c = self.canv
        c.saveState()
        c.setFillColor(colors.HexColor("#030712"))
        c.roundRect(0, 0, self.width, self.height, 20, stroke=0, fill=1)
        nodes = {
            "Début": (18, 82, 50, 54, "DÉBUT", None, "0", "0", "#9CA3AF"),
            "A": (92, 70, 64, 82, "A", ["Analyser", "le besoin"], "0", "0", "#60A5FA"),
            "B": (190, 145, 76, 88, "B", ["Rédiger le cahier", "des charges"], "2", "2", "#7ED957"),
            "C": (190, 18, 76, 84, "C", ["Choisir les outils"], "2", "3", "#D6A400"),
            "D": (312, 80, 68, 82, "D", ["Construire", "le prototype"], "5", "5", "#C084FC"),
            "E": (405, 80, 68, 82, "E", ["Tester", "la solution"], "9", "9", "#F87171"),
            "F": (492, 80, 68, 82, "F", ["Présenter", "le projet"], "11", "11", "#5EEAD4"),
            "Fin": (570, 82, 50, 54, "FIN", None, "12", "12", "#9CA3AF"),
        }
        sx = self.width / 640
        sy = self.height / 250
        c.scale(sx, sy)
        self.arrow(c, 68, 109, 92, 109, "0 j")
        self.arrow(c, 156, 132, 190, 189, "2 j")
        self.arrow(c, 156, 91, 190, 60, "2 j")
        self.arrow(c, 266, 189, 312, 130, "3 j")
        self.arrow(c, 266, 60, 312, 112, "2 j")
        self.arrow(c, 380, 121, 405, 121, "4 j")
        self.arrow(c, 473, 121, 492, 121, "2 j")
        self.arrow(c, 560, 121, 570, 109, "1 j")
        for data in nodes.values():
            self.draw_node(c, *data)
        c.setFillColor(colors.HexColor("#D7FF4F"))
        c.roundRect(18, 12, 150, 22, 11, stroke=0, fill=1)
        c.setFillColor(colors.HexColor("#030712"))
        c.setFont("Planif-Bold", 7.5)
        c.drawCentredString(93, 20, "Chemin critique : A → B → D → E → F")
        c.restoreState()


def diagnostic_pdf():
    blocks = [
        [section("Fiche technique"), p("La matrice BCG est un outil d’analyse stratégique développé par le Boston Consulting Group. Elle permet d’optimiser la gestion de portefeuille d’activités d’une entreprise en positionnant chaque Domaine d’Activité Stratégique (DAS) selon leur position concurrentielle et l’attractivité de leur marché."), Spacer(1, 8)],
        [section("Les 4 quadrants de la matrice BCG")]
        + [bullet(x) for x in [
            "Vedette : leader sur un marché en forte croissance. Génère et consomme beaucoup de liquidités. Conseil : investir pour maintenir la position dominante, potentiel futur vache à lait.",
            "Vache à lait : leader sur un marché mature. Génère des excédents de trésorerie avec peu d’investissements. Conseil : maintenir la position et réinvestir les flux dans les vedettes et dilemmes.",
            "Dilemme : challenger sur un marché en forte croissance. Faible rentabilité malgré la dynamique du marché. Conseil : investir massivement pour gagner des parts ou se désengager si l’écart est trop grand.",
            "Poid mort : challenger sur un marché à faible croissance. Rentabilité faible ou négative. Conseil : envisager le désengagement progressif ou maintenir si l’activité reste rentable.",
        ]],
        [section("Notions à maîtriser"), concept_grid([
            ("Stratégie", "Définition d’objectifs de long terme, choix de politiques et allocation optimale des ressources."),
            ("Taux de croissance du marché", "Axe vertical. Il mesure l’attractivité du marché."),
            ("Part de marché relative", "Axe horizontal. Elle mesure la position concurrentielle de l’entreprise."),
            ("Taille des cercles", "Proportionnelle à la contribution du DAS au chiffre d’affaires total."),
        ])],
        [section("Méthode et formules")]
        + [bullet(x) for x in [
            "TC = (CA(N) − CA(N−1)) / CA(N−1) × 100. Si TC > 1 : le marché devient plus attractif. Si TC < 1 : l’activité perd en dynamique.",
            "PMR = CA du DAS de l’entreprise / CA du principal concurrent. Si PMR > 1 : leader. Si PMR < 1 : challenger.",
            "Le DAS avec le CA le plus faible reçoit un cercle de diamètre D₀ = 1 cm (rayon R₀ = 0,5 cm).",
            "S₀ = π × R₀² = π × (0,5)² ≈ 0,785 cm² ; S(DASi) = S₀ × [CA(DASi) / CA(DAS₀)] ; R = √(S / π) ; D = 2 × R.",
        ]],
        [section("Étapes"), *[bullet(x) for x in [
            "Calculer le taux de croissance des DAS.",
            "Calculer la part de marché relative des DAS.",
            "Calculer la superficie des DAS.",
            "Tracer la matrice BCG.",
            "Ajuster l’axe médian de PMR à 1.",
            "Ajuster l’axe médian de TC à la moyenne du marché, ici 10 %.",
            "Placer les DAS sur la matrice BCG.",
            "Commenter l’équilibre global et conseiller l’entreprise.",
        ]]],
        [PageBreak(), section("Exercice — groupe LUMEX"), p("Le groupe LUMEX, spécialisé dans l’éclairage professionnel et résidentiel, décompose son activité en trois Domaines d’Activité Stratégique (DAS). Le service stratégique a compilé les données suivantes pour les années N-1 et N (chiffres d’affaires en milliers d’euros). On retiendra un taux de croissance moyen de 10 % pour le marché de l’éclairage.")],
        [para_table([
            ["DAS / Année", "DAS 1 éclairage industriel", "DAS 2 éclairage résidentiel", "DAS 3 éclairage connecté"],
            ["N-1", "48 000", "35 000", "15 000"],
            ["N", "55 200", "36 750", "21 000"],
        ], widths=[3.2*cm, 4.3*cm, 4.3*cm, 4.3*cm])],
        [para_table([
            ["Concurrent", "DAS 1", "DAS 2", "DAS 3"],
            ["Alpha", "38 000", "50 000", "28 000"],
            ["Beta", "45 000", "30 000", "12 000"],
            ["Gamma", "25 000", "20 000", "6 000"],
        ], widths=[4*cm, 4*cm, 4*cm, 4*cm])],
        [section("Questions"), bullet("Réaliser la représentation matricielle du portefeuille d’activité du groupe LUMEX."), bullet("Analyser et commenter le portefeuille. Quelles recommandations stratégiques formulez-vous ?")],
        [section("Correction"), para_table([
            ["Calcul", "DAS 1", "DAS 2", "DAS 3"],
            ["TC", "(55 200 − 48 000) / 48 000 × 100 = 15 %", "(36 750 − 35 000) / 35 000 × 100 = 5 %", "(21 000 − 15 000) / 15 000 × 100 = 40 %"],
            ["Principal concurrent", "Beta : 45 000", "Alpha : 50 000", "Alpha : 28 000"],
            ["PMR", "55 200 / 45 000 = 1,23 ; leader", "36 750 / 50 000 = 0,74 ; challenger", "21 000 / 28 000 = 0,75 ; challenger"],
        ], widths=[2.7*cm, 4.8*cm, 4.8*cm, 4.8*cm], dark=True)],
        [para_table([
            ["Calcul", "DAS 1", "DAS 2", "DAS 3"],
            ["Surface S", "0,785 × (55 200 / 21 000) = 2,064 cm²", "0,785 × (36 750 / 21 000) = 1,374 cm²", "π × (0,5)² = 0,785 cm²"],
            ["Rayon R", "√(2,064 / π) = 0,81 cm", "√(1,374 / π) = 0,66 cm", "√(0,785 / π) = 0,50 cm"],
            ["Diamètre D", "2 × 0,81 = 1,62 cm", "2 × 0,66 = 1,32 cm", "2 × 0,50 = 1,00 cm"],
        ], widths=[2.7*cm, 4.8*cm, 4.8*cm, 4.8*cm], dark=True)],
        [Spacer(1, 8), BcgMatrixFlowable(), Spacer(1, 8)],
        [callout("Matrice BCG — lecture finale", [
            "DAS 1 : Vedette — PMR = 1,23 ; TC = 15 %.",
            "DAS 3 : Dilemme — PMR = 0,75 ; TC = 40 %.",
            "DAS 2 : Poid mort — PMR = 0,74 ; TC = 5 %.",
            "Aucun DAS en vache à lait : le portefeuille manque de génération de liquidités stables.",
        ], "#EEF2FF")],
        [section("Analyse et recommandations"), *[bullet(x) for x in [
            "DAS 1 : investir pour conserver et renforcer la position de leader.",
            "DAS 2 : évaluer la rentabilité réelle ; maintenir si elle est positive, sinon envisager un désengagement progressif.",
            "DAS 3 : investir massivement pour rattraper Alpha et transformer ce DAS en vedette.",
            "LUMEX doit investir dans les DAS 1 et 3 afin qu’ils prennent le relais de la génération de cash.",
        ]]],
        [section("Approfondissement"), *[bullet(x) for x in [
            "Rentabilité économique : EBE / Actif total.",
            "Rentabilité commerciale nette : Résultat net / CA HT.",
            "Rentabilité financière : Résultat net / capitaux propres.",
            "Capacité d’autofinancement : Résultat net + dotations aux amortissements.",
        ]]],
    ]
    build_pdf("diagnostic-strategique.pdf", "Diagnostic stratégique — Matrice BCG", blocks)


def budgets_pdf():
    blocks = [
        [section("Fiche technique"), p("Le budget est un ensemble de prévisions chiffrées qui organise les ventes, la production, les achats, les charges, la TVA, les encaissements, les décaissements et la trésorerie.")],
        [section("Notions à maîtriser"), concept_grid([
            ("Articulation budgétaire", "Organisation des budgets opérationnels et financiers."),
            ("Budget de TVA", "TVA collectée − TVA déductible = TVA à décaisser."),
            ("Encaissements", "Entrées d’argent : créances clients et ventes encaissées."),
            ("Décaissements", "Sorties d’argent : dettes, achats, frais, TVA, investissements."),
            ("Trésorerie finale", "Trésorerie initiale + encaissements − décaissements."),
            ("Documents de synthèse", "Compte de résultat prévisionnel et bilan prévisionnel."),
        ])],
        [section("Méthode"), *[bullet(x) for x in [
            "Prévoir les ventes et le chiffre d’affaires.",
            "Construire les budgets de production, d’approvisionnement, d’administration et d’investissement.",
            "Calculer la TVA collectée, la TVA déductible et la TVA à décaisser.",
            "Établir les budgets d’encaissements et de décaissements.",
            "Calculer la trésorerie finale.",
        ]]],
        [BudgetFlowFlowable(), Spacer(1, 8)],
        [section("Formules"), *[bullet(x) for x in [
            "TVA à décaisser = TVA collectée − TVA déductible.",
            "Total encaissements = créances clients du bilan + encaissements sur ventes.",
            "Total décaissements = dettes du bilan + dépenses de la période.",
            "Trésorerie finale = trésorerie initiale + encaissements − décaissements.",
        ]]],
        [PageBreak(), section("Exercice"), p("Une entreprise prévoit son activité mensuelle et doit construire les principaux budgets : ventes, production, approvisionnements, TVA, encaissements, décaissements et trésorerie.")],
        [para_table([
            ["Élément", "Donnée", "Budget concerné"],
            ["Ventes", "1 000 unités à 40 € HT ; TVA 20 % ; 70 % encaissé comptant", "Ventes / encaissements"],
            ["Production", "Production uniforme de 1 060 unités ; charges fixes 4 000 €, MOD 5 000 €, amortissement 2 000 €", "Production"],
            ["Matières premières", "12 720 € HT ; TVA 20 %", "Approvisionnements"],
            ["Bilan initial", "Créances clients 8 000 € ; dettes fournisseurs 5 000 €", "Flux de trésorerie"],
            ["Administration", "Frais administratifs 2 500 € HT ; TVA 20 %", "Charges"],
            ["Investissement", "Achat machine 10 000 € HT ; TVA 20 %, payé comptant", "Investissement"],
            ["Trésorerie initiale", "12 000 €", "Trésorerie"],
        ], widths=[3.3*cm, 9.2*cm, 4*cm])],
        [section("Correction"), *[bullet(x) for x in [
            "Budget des ventes : CA HT = 1 000 × 40 = 40 000 €. TVA collectée = 8 000 €. CA TTC = 48 000 €.",
            "Budget de production : total HT = 12 720 + 5 000 + 4 000 + 2 000 = 23 720 €. TVA sur frais de production = 800 €. Total TTC = 24 520 €.",
            "Approvisionnements : TVA déductible = 12 720 × 20 % = 2 544 €. Achats TTC = 15 264 €.",
            "Investissement : TVA déductible = 2 000 €. Investissement TTC payé comptant = 12 000 €.",
            "Frais administratifs : TVA déductible = 500 €. Total TTC = 3 000 €.",
            "Budget de TVA : TVA déductible totale = 2 544 + 800 + 2 000 + 500 = 5 844 €. TVA à décaisser = 8 000 − 5 844 = 2 156 €.",
            "Encaissements : 48 000 × 70 % + 8 000 = 41 600 €.",
            "Décaissements : 15 264 + 5 000 + 4 800 + 3 000 + 12 000 + 2 156 + 5 000 = 47 220 €.",
            "Trésorerie finale : 12 000 + 41 600 − 47 220 = 6 380 €.",
        ]]],
        [callout("Conclusion", ["La trésorerie finale reste positive à 6 380 € malgré les dépenses de production, d’administration et d’investissement."], "#ECFDF5")],
    ]
    build_pdf("budgets-articulation-budgetaire.pdf", "Budgets & articulation budgétaire", blocks)


def ecarts_pdf():
    blocks = [
        [section("Fiche technique"), p("Le contrôle budgétaire compare le prévisionnel et le réalisé afin d’identifier les causes des écarts et de proposer des actions correctives.")],
        [section("Notions à maîtriser"), concept_grid([
            ("Coût prévisionnel", "Coût estimé avant la période à partir du budget."),
            ("Coût constaté", "Coût réellement observé à la fin de la période."),
            ("Écart", "Différence entre réel et prévu ajusté."),
            ("Gestion par exception", "On analyse en priorité les écarts significatifs."),
            ("Écart favorable", "L’écart améliore le résultat ou diminue le coût."),
            ("Écart défavorable", "L’écart dégrade le résultat ou augmente le coût."),
        ])],
        [section("Méthode et formules"), *[bullet(x) for x in [
            "Norme élémentaire = quantité prévue / production prévue.",
            "Quantité prévue ajustée = norme élémentaire × production réelle.",
            "Écart sur prix = (prix réel − prix prévu) × quantité réelle.",
            "Écart sur quantité = (quantité réelle − quantité prévue ajustée) × prix prévu.",
            "Écart global = coût réel − coût prévu ajusté = écart sur prix + écart sur quantité.",
        ]]],
        [PageBreak(), section("Exercice"), p("Une entreprise produit des sacs et souhaite analyser l’écart entre la consommation prévue de matière première et la consommation réellement constatée.")],
        [para_table([
            ["Élément", "Donnée"],
            ["Production prévue", "1 000 sacs"],
            ["Consommation prévue", "500 kg de matière première"],
            ["Prix standard", "8 € / kg"],
            ["Production réelle", "1 100 sacs"],
            ["Quantité réelle consommée", "540 kg"],
            ["Prix réel", "8,50 € / kg"],
        ], widths=[6*cm, 10*cm])],
        [section("Correction"), *[bullet(x) for x in [
            "Norme élémentaire = 500 / 1 000 = 0,5 kg par sac.",
            "Quantité prévue ajustée = 0,5 × 1 100 = 550 kg.",
            "Coût prévu ajusté = 550 × 8 = 4 400 €.",
            "Coût réel = 540 × 8,50 = 4 590 €.",
            "Écart global = 4 590 − 4 400 = +190 €, défavorable.",
            "Écart sur prix = (8,50 − 8) × 540 = +270 €, défavorable.",
            "Écart sur quantité = (540 − 550) × 8 = −80 €, favorable.",
            "Vérification : 270 + (−80) = 190 €.",
        ]]],
        [VarianceBarsFlowable(), Spacer(1, 8)],
        [para_table([
            ["Élément", "Quantité réelle", "Prix réel", "Coût réel", "Quantité prévue ajustée", "Prix prévu", "Coût prévu", "Écart"],
            ["Matière première", "540 kg", "8,50 €", "4 590 €", "550 kg", "8 €", "4 400 €", "+190 €"],
        ], widths=[3.0*cm, 2.1*cm, 1.8*cm, 2.0*cm, 3.0*cm, 1.8*cm, 2.0*cm, 1.5*cm])],
        [callout("Conclusion", ["L’écart global défavorable provient surtout de la hausse du prix d’achat, malgré une économie sur les quantités consommées. Une négociation fournisseur peut limiter les futurs dépassements."], "#FFF1D6")],
    ]
    build_pdf("controle-budgetaire-ecarts.pdf", "Contrôle budgétaire & écarts", blocks)


def mpm_pdf():
    blocks = [
        [section("Fiche technique"), p("La méthode MPM permet de représenter un projet sous forme de réseau. Elle aide à visualiser l’ordre des tâches, la durée totale, les marges et les tâches critiques.")],
        [section("Notions à maîtriser"), concept_grid([
            ("Tâche", "Action à réaliser dans le projet, représentée par un sommet."),
            ("Antériorité", "Une tâche doit être terminée avant qu’une autre commence."),
            ("Date au plus tôt", "Première date à laquelle une tâche peut commencer."),
            ("Date au plus tard", "Dernière date possible sans retarder le projet."),
            ("Marge totale", "Retard maximum sans retarder la fin globale du projet."),
            ("Chemin critique", "Suite de tâches sans marge ; tout retard retarde le projet."),
        ])],
        [section("Méthode"), *[bullet(x) for x in [
            "Analyser les tâches antérieures.",
            "Établir la matrice des niveaux.",
            "Tracer le graphe MPM.",
            "Calculer les dates au plus tôt.",
            "Calculer les dates au plus tard.",
            "Déterminer la durée minimale du projet.",
            "Identifier le chemin critique.",
            "Calculer les marges.",
        ]]],
        [section("Formules"), *[bullet(x) for x in [
            "Date au plus tôt = max(DTO(i) + Durée(i)) ; i = tâches antécédentes.",
            "Date au plus tard = min(DTA(j) − Durée(j)) ; j = tâches suivantes.",
            "Marge totale = date au plus tard − date au plus tôt.",
        ]]],
        [PageBreak(), section("Exercice"), p("Un groupe doit préparer une présentation de projet. Les tâches, durées et antériorités sont les suivantes.")],
        [para_table([
            ["Tâche", "Description", "Durée", "Antécédents"],
            ["A", "Analyser le besoin", "2 j", "-"],
            ["B", "Rédiger le cahier des charges", "3 j", "A"],
            ["C", "Choisir les outils", "2 j", "A"],
            ["D", "Construire le prototype", "4 j", "B, C"],
            ["E", "Tester la solution", "2 j", "D"],
            ["F", "Présenter le projet", "1 j", "E"],
        ], widths=[2*cm, 7*cm, 2.5*cm, 4*cm])],
        [section("Correction"), para_table([
            ["Tâche", "Date au plus tôt", "Date au plus tard", "Marge", "Statut"],
            ["Début", "0", "0", "0", "Critique"],
            ["A", "0", "0", "0", "Critique"],
            ["B", "2", "2", "0", "Critique"],
            ["C", "2", "3", "1", "Avec marge"],
            ["D", "5", "5", "0", "Critique"],
            ["E", "9", "9", "0", "Critique"],
            ["F", "11", "11", "0", "Critique"],
            ["Fin", "12", "12", "0", "Critique"],
        ], widths=[3*cm, 3*cm, 3*cm, 2.5*cm, 4*cm])],
        [Spacer(1, 8), MpmNetworkFlowable(), Spacer(1, 8)],
        [callout("Réseau final", [
            "Début → A → B → D → E → F → Fin",
            "Branche alternative : A → C → D.",
            "Chemin critique : A → B → D → E → F.",
            "Durée totale du projet : 12 jours.",
        ], "#EEF2FF")],
        [section("À retenir"), *[bullet(x) for x in [
            "Le réseau montre l’ordre logique des tâches.",
            "Une marge nulle signale une tâche critique.",
            "Un retard sur le chemin critique retarde tout le projet.",
            "Erreurs fréquentes : ne pas ajouter une tâche Début et une tâche Fin comme tâches du projet ; calculer les dates au plus tard dans le mauvais sens.",
        ]]],
    ]
    build_pdf("planification-projet-mpm.pdf", "Planification de projet / MPM", blocks)


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    diagnostic_pdf()
    budgets_pdf()
    ecarts_pdf()
    mpm_pdf()
    print(f"Generated PDFs in {OUT_DIR}")


if __name__ == "__main__":
    main()

import { NextRequest, NextResponse } from "next/server";
import { Page, Text, View, Document, StyleSheet, renderToStream } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 32,
    gap: 16
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  productSection: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#DFDFDF",
    borderRadius: 10,
    gap: 10
  },
  title: {
    padding: 10,
    fontWeight: "700",
    fontSize: 14,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    color: "#6B6B6B",
  },
  description: {
    fontSize: 12,
    fontWeight: '400',
    color: "#2E2E2E"
  }
});

const products = [
  {
    name: "Social Media Management",
    description: "Comprehensive management of social media profiles including content creation, scheduling, audience engagement, and performance analytics.",
    note: "Monthly subscription plan. Includes up to 4 social platforms.",
    quantity: 1,
    unit_price: 1200.00
  },
  {
    name: "Search Engine Optimization (SEO)",
    description: "On-page and off-page SEO services aimed at improving website visibility in search engine results through keyword optimization, technical improvements, and backlink strategies.",
    note: "Includes an initial audit and monthly performance report.",
    quantity: 1,
    unit_price: 950.00
  },
  {
    name: "Google Ads Campaign",
    description: "Planning, creation, and management of Google Ads campaigns to drive targeted traffic and generate conversions for your business.",
    note: "Ad spend not included. Minimum 3-month contract recommended.",
    quantity: 1,
    unit_price: 800.00
  },
  {
    name: "Brand Identity Design",
    description: "Development of a complete visual identity including logo, color palette, typography, and brand style guide for consistent and professional communication.",
    note: "Includes three initial concepts and two revision rounds.",
    quantity: 1,
    unit_price: 1500.00
  },
  {
    name: "Email Marketing Campaign",
    description: "Creation and distribution of targeted email campaigns using professional templates, automation, and performance tracking to nurture leads and retain customers.",
    note: "Up to 10,000 emails per month included.",
    quantity: 1,
    unit_price: 600.00
  },
  {
    name: "Content Marketing Strategy",
    description: "Custom content strategy tailored to your audience and brand goals, including blog planning, topic research, and SEO alignment for organic traffic growth.",
    note: "One-month plan including up to 8 content pieces.",
    quantity: 1,
    unit_price: 1100.00
  },
  {
    name: "Video Production (Short Ad)",
    description: "Production of a high-quality promotional video of up to 60 seconds, including scriptwriting, shooting, editing, and motion graphics.",
    note: "One revision round included. Requires client approval at storyboard phase.",
    quantity: 1,
    unit_price: 1800.00
  },
  {
    name: "Website Audit Report",
    description: "Detailed audit of your existing website to identify technical issues, UX problems, SEO gaps, and content recommendations for better performance.",
    note: "Includes PDF report and 30-minute consultation.",
    quantity: 1,
    unit_price: 400.00
  }
]

const total = products.reduce((sum, product) => {
    return sum + (product.unit_price * product.quantity)
}, 0)



// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={{ gap: 4 }} fixed={true}>
        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Empresa: <Text style={{ fontWeight: '500' }}> COMPANY_NAME </Text> </Text>
        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Aos cuidados de: BEATRIZ BONA</Text>
      </View>
      <View style={{ marginVertical: 24, alignItems: 'center', gap: 4, }}>
        <Text style={{ marginVertical: 24, fontWeight: '600' }}>Proposta "NOME DA PROPOSTA"</Text>
        {products.map((item, index) => (
            <View key={index} style={styles.productSection} wrap={false}>
                <Text style={styles.title}> {index+1} {item.name} </Text>

                <Text style={{ fontSize: 10, color: "#5E5E5E", fontWeight: "700" }}>DESCRIÇÃO</Text>

                <Text style={styles.description} > {item.description} </Text>
                <View style={{ alignItems: 'flex-end', justifyContent: 'center', gap: 4 }}>
                    <Text style={[styles.description, { fontSize: 8, textAlign: 'center' }]}>VALOR UNITÁRIO</Text>
                    <Text style={styles.title}> R$ {item.unit_price} </Text>
                </View>
            </View>
        ))}
        <View style={{ width: '100%', alignItems: 'flex-end', justifyContent: 'flex-end', marginTop: 16}}>
            <Text style={{ fontSize: 12 }}>TOTAL</Text>
            <Text> R$ {total} </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 32 }}>
            <View>
                <Text>Validade</Text>
            </View>
            <View>
                <Text>Forma</Text>
            </View>
            <View>
                <Text>Criador</Text>
            </View>
        </View>
        <View>

        </View>
      </View>
    </Page>
  </Document>
);

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const stream = await renderToStream(<MyDocument />)

    return new NextResponse(stream as unknown as ReadableStream)
}
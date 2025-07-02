
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, MessageCircle, Mail, Phone, HelpCircle } from 'lucide-react';

const Support = () => {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const faqs = [
    {
      id: '1',
      question: '면접 연습은 어떻게 진행되나요?',
      answer: '원하는 분야를 선택하고 난이도를 설정한 후, AI가 생성하는 질문에 답변하시면 됩니다. 실시간으로 피드백을 받을 수 있습니다.'
    },
    {
      id: '2',
      question: '오답노트는 어떻게 활용하나요?',
      answer: '면접 연습 중 틀린 문제들이 자동으로 오답노트에 저장됩니다. 언제든지 다시 확인하고 복습할 수 있습니다.'
    },
    {
      id: '3',
      question: '어떤 분야의 면접 연습이 가능한가요?',
      answer: '프론트엔드(React, JavaScript), 백엔드(Java, Spring), DevOps, 그리고 네트워크, 자료구조, 운영체제 등 다양한 분야를 지원합니다.'
    },
    {
      id: '4',
      question: '커뮤니티에서 어떤 활동을 할 수 있나요?',
      answer: '면접 경험을 공유하고, 질문과 답변을 올리며, 다른 개발자들과 소통할 수 있습니다.'
    },
    {
      id: '5',
      question: '회원가입은 필수인가요?',
      answer: '기본적인 면접 연습은 회원가입 없이도 가능하지만, 오답노트와 커뮤니티 기능을 이용하려면 회원가입이 필요합니다.'
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    // 실제 서비스에서는 API 호출
    alert('문의가 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.');
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            <HelpCircle className="inline-block mr-3 h-10 w-10 text-blue-600" />
            고객센터
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            자주 묻는 질문과 문의사항을 확인하세요
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* FAQ Section */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">자주 묻는 질문</h3>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <Card key={faq.id} className="cursor-pointer">
                  <CardHeader 
                    className="pb-3"
                    onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                  >
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-medium text-gray-900">
                        {faq.question}
                      </CardTitle>
                      {openFAQ === faq.id ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  </CardHeader>
                  {openFAQ === faq.id && (
                    <CardContent className="pt-0">
                      <p className="text-gray-600">{faq.answer}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">문의하기</h3>
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      이름
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={handleInputChange}
                      placeholder="이름을 입력하세요"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      이메일
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={handleInputChange}
                      placeholder="이메일을 입력하세요"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      제목
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={contactForm.subject}
                      onChange={handleInputChange}
                      placeholder="문의 제목을 입력하세요"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      내용
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={contactForm.message}
                      onChange={handleInputChange}
                      placeholder="문의 내용을 자세히 입력하세요"
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <Mail className="h-4 w-4 mr-2" />
                    문의 보내기
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">연락처 정보</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-3 text-blue-600" />
                    <span className="text-gray-600">support@interviewace.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-3 text-blue-600" />
                    <span className="text-gray-600">02-1234-5678</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-3 text-blue-600" />
                    <span className="text-gray-600">평일 09:00 - 18:00</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Support;
